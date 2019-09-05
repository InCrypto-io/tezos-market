type storage = string

let%init initial_votes  =
  "dfsfds"

let%entry set_value (choice : string) votes =
  ( [], choice )
