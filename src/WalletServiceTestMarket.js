import * as React from "react";
import Wallet from "./Wallet";

const contract = `
{ parameter (or (or (or address nat) (or nat (pair %placeOrder (pair nat address) mutez))) address) ;
  storage
    (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
          (pair nat (set address))) ;
  code { {} ;
         { { PUSH (lambda
                     (pair (pair (pair nat address) mutez)
                           (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                 (pair nat (set address))))
                     (pair (list operation)
                           (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                 (pair nat (set address)))))
                  { { {} ;
                      { { { { DUP } ; CAR } ;
                          { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                            { { { { PUSH mutez 0 ;
                                    { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CDR } } ;
                                  { COMPARE ; EQ } } ;
                                IF { { { PUSH string "Price should be greater than 0tz" ;
                                         { { PUSH mutez 0 ;
                                             { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                               CDR } } ;
                                           { COMPARE ; EQ } } } ;
                                       IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                   { { { { { { { { { { DUP } ; CDR } } ; CDR } ;
                                               { { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CAR } } ;
                                                 CDR } } ;
                                             MEM } } ;
                                         NOT } ;
                                       IF { { { PUSH string "Issuer is not in whitelist" ;
                                                { { { { { { { { { DIP { DUP } ; SWAP } } ; CDR } } ; CDR } ;
                                                        { { { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                              CAR } } ;
                                                          CDR } } ;
                                                      MEM } } ;
                                                  NOT } } ;
                                              IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                          { PUSH unit Unit } } } } ;
                              { { { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CDR } ;
                                    { { { { { {} ; SOURCE } ;
                                            { { { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                      SWAP } } ;
                                                  CAR } } ;
                                              CDR } } ;
                                          PAIR } ;
                                        { { { { { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                      SWAP } } ;
                                                  CAR } } ;
                                              CAR } ;
                                            PUSH bool True } ;
                                          PAIR } } ;
                                      PAIR } } ;
                                  PAIR } ;
                                { { { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CAR } } ;
                                    CAR } ;
                                  { { {} ;
                                      { { DUP ;
                                          { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ;
                                          { { { { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                    SWAP } } ;
                                                            SWAP } } ;
                                                    SWAP } } ;
                                                CAR } } ;
                                            CAR } } ;
                                        { DIP { SOME } ; UPDATE } } ;
                                      {} ;
                                      { DIP { DUP } ; SWAP } ;
                                      {} ;
                                      SWAP ;
                                      {} ;
                                      DIP { DROP } ;
                                      {} ;
                                      DIP { DROP } ;
                                      {} } ;
                                    { { {} ;
                                        DUP ;
                                        {} ;
                                        { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                          SWAP } ;
                                        {} ;
                                        SWAP ;
                                        {} ;
                                        { DIP { { DUP ; CAR ; DIP { CDR } } } ;
                                          { DIP { { DUP ; CAR ; DIP { CDR } } } ; DIP { DROP } ; PAIR } ;
                                          PAIR } ;
                                        {} ;
                                        { SWAP ;
                                          DIP { { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } } } ;
                                        {} } ;
                                      { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                          NIL operation } ;
                                        PAIR } } } ;
                                  {} ;
                                  DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                                          DROP } } } ;
                                {} ;
                                DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } } ;
                            {} ;
                            DIP { { DIP { { DIP { DIP { DIP { {} } } } ; DROP } } ; DROP } } } ;
                          {} ;
                          DIP { { DIP { DIP { {} } } ; DROP } } } ;
                        DIP { { DIP { {} } ; DROP } } } } } ;
             { PUSH (lambda (pair nat (map nat (pair (pair (pair bool nat) (pair address address)) mutez))) bool)
                    { { {} ;
                        { { { { DUP } ; CAR } ;
                            { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                              { PUSH bool False ;
                                { { { { DIP { DUP } ; SWAP } ;
                                      { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                    GET } ;
                                  { { DUP ;
                                      IF_NONE
                                        { PUSH unit Unit }
                                        { { { { {} ;
                                                PUSH bool True ;
                                                {} ;
                                                { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                                {} ;
                                                SWAP ;
                                                {} ;
                                                DIP { DROP } ;
                                                {} ;
                                                { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } ;
                                                {} } ;
                                              PUSH unit Unit } ;
                                            DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                                                    DROP } } } } } ;
                                    { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                  {} ;
                                  DIP { { DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } ;
                                          DROP } } } ;
                                {} ;
                                DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } } ;
                              {} ;
                              DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } ;
                            {} ;
                            DIP { { DIP { DIP { {} } } ; DROP } } } ;
                          DIP { { DIP { {} } ; DROP } } } } } ;
               { { { DUP ;
                     PUSH (lambda
                             (pair (pair nat
                                         (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                               (pair nat (set address))))
                                   (lambda (pair nat (map nat (pair (pair (pair bool nat) (pair address address)) mutez))) bool))
                             (pair (list operation)
                                   (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                         (pair nat (set address)))))
                          { { {} ;
                              { { { DUP ;
                                    DIP { { DIP { {} } ; DROP } } ;
                                    { { DUP ; CAR ; DIP { CDR } } ; DIP { {} } } } ;
                                  { { { DUP } ; CAR } ;
                                    { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                      { { { { { {} ;
                                                {} ;
                                                { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                                {} ;
                                                { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CAR } ;
                                                    { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                  PAIR } ;
                                                EXEC } } ;
                                            NOT } ;
                                          IF { { { { { PUSH string " not found" ;
                                                       { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ;
                                                           PUSH string "Cannot cancel order; order " } ;
                                                         PAIR } } ;
                                                     PAIR } ;
                                                   { { { {} ;
                                                         {} ;
                                                         { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                           SWAP } ;
                                                         {} ;
                                                         { { { { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CAR } } ;
                                                               CAR } ;
                                                             { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                               SWAP } } ;
                                                           PAIR } ;
                                                         EXEC } } ;
                                                     NOT } } ;
                                                 IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                             { PUSH unit Unit } } ;
                                        { { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CAR } ;
                                              { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                            { GET ; IF_NONE { { PUSH string "GET_FORCE" ; FAILWITH } } { {} } } } ;
                                          { { { { { { { { { { DUP } ; CAR } } ; CDR } } ; CDR } ;
                                                  { {} ; SOURCE } } ;
                                                { COMPARE ; NEQ } } ;
                                              IF { { { PUSH string "You are not owner of the order" ;
                                                       { { { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CDR } } ;
                                                             CDR } ;
                                                           { {} ; SOURCE } } ;
                                                         { COMPARE ; NEQ } } } ;
                                                     IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                                 { PUSH unit Unit } } ;
                                            { { { { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                    CAR } } ;
                                                CAR } ;
                                              { { {} ;
                                                  { { DUP ;
                                                      { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                        SWAP } } ;
                                                                SWAP } } ;
                                                        SWAP } } ;
                                                    { DIP { NONE (pair (pair (pair bool nat) (pair address address)) mutez) } ;
                                                      UPDATE } } ;
                                                  {} ;
                                                  { DIP { DUP } ; SWAP } ;
                                                  {} ;
                                                  SWAP ;
                                                  {} ;
                                                  DIP { DROP } ;
                                                  {} ;
                                                  DIP { DROP } ;
                                                  {} } ;
                                                { { {} ;
                                                    DUP ;
                                                    {} ;
                                                    { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                              SWAP } } ;
                                                      SWAP } ;
                                                    {} ;
                                                    SWAP ;
                                                    {} ;
                                                    { DIP { { DUP ; CAR ; DIP { CDR } } } ;
                                                      { DIP { { DUP ; CAR ; DIP { CDR } } } ; DIP { DROP } ; PAIR } ;
                                                      PAIR } ;
                                                    {} ;
                                                    { SWAP ;
                                                      DIP { { SWAP ;
                                                              DIP { { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } } } } } ;
                                                    {} } ;
                                                  { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                        SWAP } ;
                                                      NIL operation } ;
                                                    PAIR } } } ;
                                              {} ;
                                              DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } ;
                                                      DROP } } } } ;
                                          {} ;
                                          DIP { { DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                                                          DROP } } ;
                                                  DROP } } } } ;
                                      {} ;
                                      DIP { { DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } ;
                                              DROP } } } ;
                                    {} ;
                                    DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } } ;
                                DIP { { DIP { { DIP { {} } ; DROP } } ; DROP } } } } } } ;
                   PAIR } ;
                 { { { { DIP { DUP } ; SWAP } ;
                       PUSH (lambda
                               (pair (pair nat
                                           (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                                 (pair nat (set address))))
                                     (lambda (pair nat (map nat (pair (pair (pair bool nat) (pair address address)) mutez))) bool))
                               (pair (list operation)
                                     (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                           (pair nat (set address)))))
                            { { {} ;
                                { { { DUP ;
                                      DIP { { DIP { {} } ; DROP } } ;
                                      { { DUP ; CAR ; DIP { CDR } } ; DIP { {} } } } ;
                                    { { { DUP } ; CAR } ;
                                      { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                        { { { { { {} ;
                                                  {} ;
                                                  { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                                  {} ;
                                                  { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CAR } ;
                                                      { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                    PAIR } ;
                                                  EXEC } } ;
                                              NOT } ;
                                            IF { { { { { PUSH string " not found" ;
                                                         { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ;
                                                             PUSH string "Cannot execute order; order " } ;
                                                           PAIR } } ;
                                                       PAIR } ;
                                                     { { { {} ;
                                                           {} ;
                                                           { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                             SWAP } ;
                                                           {} ;
                                                           { { { { { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; CAR } } ;
                                                                 CAR } ;
                                                               { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                 SWAP } } ;
                                                             PAIR } ;
                                                           EXEC } } ;
                                                       NOT } } ;
                                                   IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                               { PUSH unit Unit } } ;
                                          { { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CAR } ;
                                                { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                              { GET ; IF_NONE { { PUSH string "GET_FORCE" ; FAILWITH } } { {} } } } ;
                                            { { { { { { DUP } ; CDR } ; { {} ; AMOUNT } } ;
                                                  { COMPARE ; LT } } ;
                                                IF { { { { { PUSH string " ]" ;
                                                             { { { { { { { DIP { DUP } ; SWAP } } ; CDR } ; PUSH string "] < Ask[ " } ;
                                                                   PAIR } ;
                                                                 { { { {} ; AMOUNT } ; PUSH string "Bid[ " } ; PAIR } } ;
                                                               PAIR } } ;
                                                           PAIR } ;
                                                         { { { { { DIP { DUP } ; SWAP } } ; CDR } ; { {} ; AMOUNT } } ;
                                                           { COMPARE ; LT } } } ;
                                                       IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                                   { PUSH unit Unit } } ;
                                              { { { { { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                      CAR } } ;
                                                  CAR } ;
                                                { { {} ;
                                                    { { DUP ;
                                                        { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                          SWAP } } ;
                                                                  SWAP } } ;
                                                          SWAP } } ;
                                                      { DIP { NONE (pair (pair (pair bool nat) (pair address address)) mutez) } ;
                                                        UPDATE } } ;
                                                    {} ;
                                                    { DIP { DUP } ; SWAP } ;
                                                    {} ;
                                                    SWAP ;
                                                    {} ;
                                                    DIP { DROP } ;
                                                    {} ;
                                                    DIP { DROP } ;
                                                    {} } ;
                                                  { { {} ;
                                                      DUP ;
                                                      {} ;
                                                      { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                SWAP } } ;
                                                        SWAP } ;
                                                      {} ;
                                                      SWAP ;
                                                      {} ;
                                                      { DIP { { DUP ; CAR ; DIP { CDR } } } ;
                                                        { DIP { { DUP ; CAR ; DIP { CDR } } } ; DIP { DROP } ; PAIR } ;
                                                        PAIR } ;
                                                      {} ;
                                                      { SWAP ;
                                                        DIP { { SWAP ;
                                                                DIP { { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } } } } } ;
                                                      {} } ;
                                                    { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                          SWAP } ;
                                                        NIL operation } ;
                                                      PAIR } } } ;
                                                {} ;
                                                DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } ;
                                                        DROP } } } } ;
                                            {} ;
                                            DIP { { DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                                                            DROP } } ;
                                                    DROP } } } } ;
                                        {} ;
                                        DIP { { DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } ;
                                                DROP } } } ;
                                      {} ;
                                      DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } } ;
                                  DIP { { DIP { { DIP { {} } ; DROP } } ; DROP } } } } } } ;
                     PAIR } ;
                   { PUSH (lambda
                             (pair address
                                   (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                         (pair nat (set address))))
                             (pair (list operation)
                                   (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                         (pair nat (set address)))))
                          { { {} ;
                              { { { { DUP } ; CAR } ;
                                  { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                    { { { { { { { { DUP } ; CAR } } ; CDR } ; { {} ; SOURCE } } ;
                                          { COMPARE ; NEQ } } ;
                                        IF { { { PUSH string "You do not have permission." ;
                                                 { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CDR } ;
                                                     { {} ; SOURCE } } ;
                                                   { COMPARE ; NEQ } } } ;
                                               IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                           { PUSH unit Unit } } ;
                                      { { { { { { DIP { DUP } ; SWAP } } ; CDR } } ; CDR } ;
                                        { { {} ;
                                            { { DUP ;
                                                { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                  SWAP } } ;
                                              { DIP { PUSH bool True } ; UPDATE } } ;
                                            {} ;
                                            { DIP { DUP } ; SWAP } ;
                                            {} ;
                                            SWAP ;
                                            {} ;
                                            DIP { DROP } ;
                                            {} ;
                                            DIP { DROP } ;
                                            {} } ;
                                          { { {} ;
                                              DUP ;
                                              {} ;
                                              { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                              {} ;
                                              SWAP ;
                                              {} ;
                                              { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                                { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                                  DIP { DROP } ;
                                                  { SWAP ; PAIR } } ;
                                                { SWAP ; PAIR } } ;
                                              {} ;
                                              { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } ;
                                              {} } ;
                                            { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ; NIL operation } ;
                                              PAIR } } } ;
                                        {} ;
                                        DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } } ;
                                    {} ;
                                    DIP { { DIP { { DIP { DIP { DIP { {} } } } ; DROP } } ; DROP } } } ;
                                  {} ;
                                  DIP { { DIP { DIP { {} } } ; DROP } } } ;
                                DIP { { DIP { {} } ; DROP } } } } } ;
                     { PUSH (lambda
                               (pair address
                                     (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                           (pair nat (set address))))
                               (pair (list operation)
                                     (pair (pair (map nat (pair (pair (pair bool nat) (pair address address)) mutez)) address)
                                           (pair nat (set address)))))
                            { { {} ;
                                { { { { DUP } ; CAR } ;
                                    { { { { DIP { DUP } ; SWAP } } ; CDR } ;
                                      { { { { { { { { DUP } ; CAR } } ; CDR } ; { {} ; SOURCE } } ;
                                            { COMPARE ; NEQ } } ;
                                          IF { { { PUSH string "You do not have permission." ;
                                                   { { { { { { { DIP { DUP } ; SWAP } } ; CAR } } ; CDR } ;
                                                       { {} ; SOURCE } } ;
                                                     { COMPARE ; NEQ } } } ;
                                                 IF { { FAILWITH } } { { DROP ; PUSH unit Unit } } } }
                                             { PUSH unit Unit } } ;
                                        { { { { { { DIP { DUP } ; SWAP } } ; CDR } } ; CDR } ;
                                          { { {} ;
                                              { { DUP ;
                                                  { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                    SWAP } } ;
                                                { DIP { PUSH bool False } ; UPDATE } } ;
                                              {} ;
                                              { DIP { DUP } ; SWAP } ;
                                              {} ;
                                              SWAP ;
                                              {} ;
                                              DIP { DROP } ;
                                              {} ;
                                              DIP { DROP } ;
                                              {} } ;
                                            { { {} ;
                                                DUP ;
                                                {} ;
                                                { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } ;
                                                {} ;
                                                SWAP ;
                                                {} ;
                                                { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                                  { DIP { { DUP ; CDR ; DIP { CAR } } } ;
                                                    DIP { DROP } ;
                                                    { SWAP ; PAIR } } ;
                                                  { SWAP ; PAIR } } ;
                                                {} ;
                                                { SWAP ; DIP { { SWAP ; DIP { DIP { DROP } } } } } ;
                                                {} } ;
                                              { { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ; NIL operation } ;
                                                PAIR } } } ;
                                          {} ;
                                          DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } } ;
                                      {} ;
                                      DIP { { DIP { { DIP { DIP { DIP { {} } } } ; DROP } } ; DROP } } } ;
                                    {} ;
                                    DIP { { DIP { DIP { {} } } ; DROP } } } ;
                                  DIP { { DIP { {} } ; DROP } } } } } ;
                       { { { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                               SWAP } } ;
                                       SWAP } } ;
                               SWAP } } ;
                           CAR } ;
                         { { { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                         SWAP } } ;
                                                 SWAP } } ;
                                         SWAP } } ;
                                 SWAP } } ;
                             CDR } ;
                           { PUSH unit Unit ;
                             { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } ;
                               IF_LEFT
                                 { { { DUP ;
                                       IF_LEFT
                                         { { { DUP ;
                                               IF_LEFT
                                                 { { { DUP ;
                                                       { {} ;
                                                         {} ;
                                                         { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                                   SWAP } } ;
                                                                           SWAP } } ;
                                                                   SWAP } } ;
                                                           SWAP } ;
                                                         {} ;
                                                         { { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                               SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } ;
                                                             { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                                           PAIR } ;
                                                         EXEC } ;
                                                       {} ;
                                                       DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } } ;
                                                               DROP } } } ;
                                                     {} ;
                                                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } ;
                                                             DROP } } } }
                                                 { { { DUP ;
                                                       { {} ;
                                                         {} ;
                                                         { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } ;
                                                             { DIP { DUP } ; SWAP } } ;
                                                           PAIR } ;
                                                         {} ;
                                                         { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                                                                   SWAP } } ;
                                                                                                           SWAP } } ;
                                                                                                   SWAP } } ;
                                                                                           SWAP } } ;
                                                                                   SWAP } } ;
                                                                           SWAP } } ;
                                                                   SWAP } } ;
                                                           SWAP } ;
                                                         { DUP ; CAR ; DIP { CDR } } ;
                                                         {} ;
                                                         DIP { { SWAP ; { PAIR } } } ;
                                                         {} ;
                                                         SWAP ;
                                                         EXEC } ;
                                                       {} ;
                                                       DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } } ;
                                                               DROP } } } ;
                                                     {} ;
                                                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } ;
                                                             DROP } } } } } ;
                                             {} ;
                                             DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } ;
                                                     DROP } } } }
                                         { { { DUP ;
                                               IF_LEFT
                                                 { { { DUP ;
                                                       { {} ;
                                                         {} ;
                                                         { { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } ;
                                                             { DIP { DUP } ; SWAP } } ;
                                                           PAIR } ;
                                                         {} ;
                                                         { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                                                           SWAP } } ;
                                                                                                   SWAP } } ;
                                                                                           SWAP } } ;
                                                                                   SWAP } } ;
                                                                           SWAP } } ;
                                                                   SWAP } } ;
                                                           SWAP } ;
                                                         { DUP ; CAR ; DIP { CDR } } ;
                                                         {} ;
                                                         DIP { { SWAP ; { PAIR } } } ;
                                                         {} ;
                                                         SWAP ;
                                                         EXEC } ;
                                                       {} ;
                                                       DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } } ;
                                                               DROP } } } ;
                                                     {} ;
                                                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } ;
                                                             DROP } } } }
                                                 { { { DUP ;
                                                       { {} ;
                                                         {} ;
                                                         { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                                                                           SWAP } } ;
                                                                                                                   SWAP } } ;
                                                                                                           SWAP } } ;
                                                                                                   SWAP } } ;
                                                                                           SWAP } } ;
                                                                                   SWAP } } ;
                                                                           SWAP } } ;
                                                                   SWAP } } ;
                                                           SWAP } ;
                                                         {} ;
                                                         { { { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                                               SWAP } } ;
                                                                       SWAP } } ;
                                                               SWAP } ;
                                                             { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                                           PAIR } ;
                                                         EXEC } ;
                                                       {} ;
                                                       DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } } ;
                                                               DROP } } } ;
                                                     {} ;
                                                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } } ;
                                                             DROP } } } } } ;
                                             {} ;
                                             DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } ;
                                                     DROP } } } } } ;
                                     {} ;
                                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } ;
                                             DROP } } } }
                                 { { { DUP ;
                                       { {} ;
                                         {} ;
                                         { DIP { { DIP { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                                           SWAP } } ;
                                                   SWAP } } ;
                                           SWAP } ;
                                         {} ;
                                         { { { DIP { { DIP { { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ; SWAP } } ;
                                               SWAP } ;
                                             { DIP { { DIP { DUP } ; SWAP } } ; SWAP } } ;
                                           PAIR } ;
                                         EXEC } ;
                                       {} ;
                                       DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } } ;
                                               DROP } } } ;
                                     {} ;
                                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } } } ;
                                             DROP } } } } } } ;
                           {} ;
                           DIP { { DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } } ;
                                           DROP } } ;
                                   DROP } } } ;
                         {} ;
                         DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } } ;
                                 DROP } } } ;
                       {} ;
                       DIP { { DIP { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } } ;
                               DROP } } } ;
                     {} ;
                     DIP { { DIP { DIP { DIP { DIP { DIP { DIP { {} } } } } } } ;
                             DROP } } } ;
                   {} ;
                   DIP { { DIP { DIP { DIP { DIP { DIP { {} } } } } } ; DROP } } } ;
                 {} ;
                 DIP { { DIP { DIP { DIP { DIP { {} } } } } ; DROP } } } ;
               {} ;
               DIP { { DIP { DIP { DIP { {} } } } ; DROP } } } ;
             {} ;
             DIP { { DIP { DIP { {} } } ; DROP } } } ;
           DIP { { DIP { {} } ; DROP } } } } }

`;

export default class WalletServiceTestMarket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleTx = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
            contract)
            .catch(console.error);
        wallet.invoke("placeOrder",
            {},
            5,
            "KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
                1000
        ).catch(console.error);
    };

    handleTx1 = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
            contract)
            .catch(console.error);
        wallet.invoke("transfer",
            {},
            "KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
            1
        ).catch(console.error);
    };

    handleTx2 = async () => {
        const wallet = new Wallet();
        await wallet.init("KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
            contract)
            .catch(console.error);
        wallet.invoke("transfer",
            {},
            "KT1BQKdgo8nAaWdjjUt9Hm7JziRqmLfeDzG2",
            5
        ).catch(console.error);
    };

    render() {
        return <div style={{background: "#303"}}>
            <span>++++++++wallet service market+++++++++++++++</span>
            <p>
                <button onClick={this.handleTx}>
                    place order
                </button>
            </p>
            <p>
                <button onClick={this.handleTx1}>
                    cancel order
                </button>
            </p>
            <p>
                <button onClick={this.handleTx2}>
                    fill order
                </button>
            </p>
        </div>
    }
}