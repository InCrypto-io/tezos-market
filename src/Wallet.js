import {TezosWalletUtil, TezosNodeWriter, TezosNodeReader} from 'conseiljs';
import {forEach} from "lodash";

const conseiljs = require('conseiljs');

export default class Wallet {
    accounts = [];
    contract = "";
    contractAddress = "";
    entryPoints = [];

    init = async (contractAddress, contract) => {
        console.log(">>>>>>>>>>>>");
        if (!(await this.checkAccess())) {
            await this.requestAccess();
        }

        console.log(">>>>>>+++++>>>>>>");

        this.accounts = await this.getAllAccounts();

        this.contract = contract;
        this.contractAddress = contractAddress;

        this.entryPoints = await conseiljs.TezosContractIntrospector.generateEntryPointsFromCode(this.contract);

        console.log(">>>>>>>ok>>>>>");
    };

    checkAccess = async () => {
        return await window.tbapi.haveAccess()
            .then(function (r) {
                return r === true;
            }).catch(() => (false));
    };

    requestAccess = async () => {
        return await window.tbapi.requestAccess()
            .then(function (r) {
                return r === true;
            }).catch(() => (false));
    };

    getAllAccounts = async () => {
        return await window.tbapi.getAllAccounts().then(function (r) {
            console.log(r);
            return r ? r.data : [];
        }).catch(() => ([]));
    };

    prepareParameter = (name, ...parameters) => {
        let result = "";

        console.log(parameters);

        for (var i = 0; i < parameters.length; i++) {
            console.log(">>>>>>>>>>>",typeof parameters[i], parameters[i]);
            if (typeof parameters[i] === "string") {
                parameters[i] = `"${parameters[i]}"`;
            }
        }
        forEach(this.entryPoints, (v) => {
            if (v.name.includes(name)) {
                result = v.generateParameter(parameters);
            }
        });
        console.log("prepareParameter", name, parameters, result);
        return result;
    };

    invoke = async (name, options, ...parameters) => {
        const source = options.source || this.accounts[0];
        const amount = options.amount || 0.00001;
        const fee = options.fee || 1000000;
        const gas_limit = options.gas_limit || 800000;
        const storage_limit = options.storage_limit || 60000;

        await window.tbapi.initiateTransaction(
            source, this.contractAddress, amount, fee,
            this.prepareParameter(name, ...parameters),
            gas_limit, storage_limit
        );
    };
}