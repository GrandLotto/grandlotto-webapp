// OAUTH
const LOGIN_URL = "/v1.0/OAuth/login";
const REGISTER_URL = "/v1.0/OAuth/register";
const FORGOT_PASSWORD_URL = "/v1.0/OAuth/forgotPassword";
const CONFIRM_EMAIL_URL = "/v1.0/OAuth/confirmEmail";
const RESET_PASSWORD_URL = "/v1.0/OAuth/resetPassword";
const CHANGE_PASSWORD_URL = "/v1.0/OAuth/changePassword";
const GET_USERINFO_URL = "/v1.0/OAuth/getUserInfo";
const UPDATE_USERINFO_URL = "/v1.0/OAuth/updateUser";
const UPDATE_USERIDENTITY_URL = "/v1.0/OAuth/AddUserIdenity";

// WALLET
const GET_ACCOUNT_BALANCES_URL = "/v1.0/Wallet/GetAccountBalances";
const WITHDRAW_FUNDS_URL = "/v1.0/Wallet/witdrawfund";
const GET_WITHDRAWALS_URL = "/v1.0/Wallet/witdrawfundrequest";
const GET_DEPOSITS_URL = "/v1.0/Wallet/depositlogs";

const GET_USER_DEPOSITS_URL = "/v1.0/Wallet/getuserdepositlogs";
const GET_USER_WITHDRAWALS_URL = "/v1.0/Wallet/getuserwitdrawfundrequest";

// PAYMENT
const GET_USER_BANK_ACCOUNTS_URL = "/v1.0/Payment/getUserAccount";
const GET_COUNTRY_BANK_ACCOUNTS_URL = "/v1.0/Payment/getCountryBanks";
const VERIFY_ACCOUNT_NUMBER_URL = "/v1.0/Payment/verifyAccountNumber";
const ADD_BANK_URL = "/v1.0/Payment/SaveAccountNumber";
const GET_ACCEPTED_PAYMENT_URL = "/v1.0/Game/getacceptedpayment";
const GET_ACCEPTED_IDTYPE_URL = "/v1.0/Game/getacceptedid";
const CREATE_DYNAMIC_ACCOUNT_URL = "/v1.0/Providus/createaccountdyname";
const VERIFY_PROVIDUS_URL = "/v1.0/Providus/verifytransaction";
const INITIATE_PAYSTACK_PAYMENT_URL = "/v1.0/Payment/initiatepaystackpayment";
const VERIFY_PAYSTACK_PAYMENT_URL = "/v1.0/Payment/verifypaystackpayment";

// GAME
const GET_OPEN_GAMES_URL = "/v1.0/Game/Getuseropengameplayed";
const GET_CLOSED_GAMES_URL = "/v1.0/Game/Getuserclosedgameplayed";
const GET_GAMES_URL = "/v1.0/Game/getgames";
const PLAY_GAME_URL = "/v1.0/Game/playgames";
const GET_GAMES_TYPES_URL = "/v1.0/Game/getgamestype";
const GET_GAMES_PLAYING_TYPES_URL = "/v1.0/Game/getgamesplayingtype";
const GET_GAMES_BY_TICKETID_URL = "/v1.0/Game/GetGamesbyTicketId";
const GET_GAMES_WININNG_LOGS_URL = "/v1.0/Game/Getgameswininglogs";
const CALCULATE_WINNING_URL = "/v1.0/Game/CalulatePotentialwinning";
const EXISTING_GAME_URL = "/v1.0/Game/getallexistinggames";
const GET_GAME_WINNING_NUMBERS_URL = "/v1.0/Game/GetgamewiningNumbers";

// OTHERS
const ADD_TRANSACTION_PIN_URL = "/v1.0/PIN/addTransactionPIN";
const CHANGE_TRANSACTION_PIN_URL = "/v1.0/PIN/changePIN";

export {
  LOGIN_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL,
  CHANGE_PASSWORD_URL,
  GET_USERINFO_URL,
  GET_ACCOUNT_BALANCES_URL,
  UPDATE_USERINFO_URL,
  CONFIRM_EMAIL_URL,
  ADD_TRANSACTION_PIN_URL,
  CHANGE_TRANSACTION_PIN_URL,
  GET_USER_BANK_ACCOUNTS_URL,
  GET_OPEN_GAMES_URL,
  GET_CLOSED_GAMES_URL,
  GET_COUNTRY_BANK_ACCOUNTS_URL,
  VERIFY_ACCOUNT_NUMBER_URL,
  ADD_BANK_URL,
  GET_ACCEPTED_PAYMENT_URL,
  GET_ACCEPTED_IDTYPE_URL,
  UPDATE_USERIDENTITY_URL,
  CREATE_DYNAMIC_ACCOUNT_URL,
  GET_GAMES_URL,
  GET_GAMES_TYPES_URL,
  GET_GAMES_PLAYING_TYPES_URL,
  GET_GAMES_BY_TICKETID_URL,
  GET_GAMES_WININNG_LOGS_URL,
  GET_WITHDRAWALS_URL,
  GET_USER_DEPOSITS_URL,
  GET_DEPOSITS_URL,
  WITHDRAW_FUNDS_URL,
  GET_USER_WITHDRAWALS_URL,
  PLAY_GAME_URL,
  VERIFY_PROVIDUS_URL,
  INITIATE_PAYSTACK_PAYMENT_URL,
  VERIFY_PAYSTACK_PAYMENT_URL,
  CALCULATE_WINNING_URL,
  EXISTING_GAME_URL,
  GET_GAME_WINNING_NUMBERS_URL,
};
