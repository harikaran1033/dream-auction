// src/data/leagues.js

export const IPL_TEAMS = [
  { id: "CSK", name: "Chennai Super Kings", color: "yellow" },
  { id: "MI", name: "Mumbai Indians", color: "blue" },
  { id: "RCB", name: "Royal Challengers Bengaluru", color: "red" },
  { id: "KKR", name: "Kolkata Knight Riders", color: "purple" },
  { id: "RR", name: "Rajasthan Royals", color: "pink" },
  { id: "DC", name: "Delhi Capitals", color: "blueLight" },
  { id: "SRH", name: "Sunrisers Hyderabad", color: "orange" },
  { id: "PBKS", name: "Punjab Kings", color: "redLight" },
  { id: "LSG", name: "Lucknow Super Giants", color: "cyan" },
  { id: "GT", name: "Gujarat Titans", color: "indigo" }
];

export const SA20_TEAMS = [
  { id: "MICT", name: "MI Cape Town", color: "blueDark" },
  { id: "DSG", name: "Durban's Super Giants", color: "teal" },
  { id: "PC", name: "Pretoria Capitals", color: "redDark" },
  { id: "JSK", name: "Joburg Super Kings", color: "yellow" },
  { id: "SEC", name: "Sunrisers Eastern Cape", color: "orange" },
  { id: "PR", name: "Paarl Royals", color: "pinkDark" }
];

export const BBL_TEAMS = [
  { id: "ADS", name: "Adelaide Strikers", color: "blueLight" },
  { id: "BRH", name: "Brisbane Heat", color: "redLight" },
  { id: "HBH", name: "Hobart Hurricanes", color: "purple" },
  { id: "MLR", name: "Melbourne Renegades", color: "red" },
  { id: "MLS", name: "Melbourne Stars", color: "green" },
  { id: "PRS", name: "Perth Scorchers", color: "orange" },
  { id: "SYS", name: "Sydney Sixers", color: "pinkDark" },
  { id: "SYT", name: "Sydney Thunder", color: "lime" }
];

export const HUNDRED_TEAMS = [
  { id: "MO", name: "Manchester Originals", color: "redLight" },
  { id: "NS", name: "Northern Superchargers", color: "tealLight" },
  { id: "SB", name: "Southern Brave", color: "greenDark" },
  { id: "TR", name: "Trent Rockets", color: "redDark" },
  { id: "WF", name: "Welsh Fire", color: "orangeDark" },
  { id: "LS", name: "London Spirit", color: "indigo" },
  { id: "OI", name: "Oval Invincibles", color: "violet" },
  { id: "BP", name: "Birmingham Phoenix", color: "amber" }
];

export const LEAGUES = [
  { league: "IPL", teams: IPL_TEAMS },
  { league: "SA20", teams: SA20_TEAMS },
  { league: "BBL", teams: BBL_TEAMS },
  { league: "100", teams: HUNDRED_TEAMS }
];
