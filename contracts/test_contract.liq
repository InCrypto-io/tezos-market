type storage = {
  text: string;
  num: int;
}

let%init storage : storage  =
  {text = "dfsfds";
   num = 5875;} 

let%entry set_value (choice : string) storage = 
  let storage =
    {text = choice;
     num = storage.num;} in
  ( [], storage )

let%entry set_values ((choice : string), (num: int)) storage =
  let storage = 
    {text = choice;
     num = num;} in
  ( [], storage )