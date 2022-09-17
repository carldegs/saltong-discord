# TASKS TO DO

## Commands

- `/last {mode}` get your last turn for a given game mode
- `/stats` get game statistics
- `/leaderboards fastest` (only for guilds) get top guild players by fastest time to solve.
  - Show average guild solve time.
  - If not in the top 10, show requester's rank
  - [NTH] `/leaderboards fastest {'daily' | 'weekly' | 'monthly' | 'all'}` Add option to show daily, weekly, monthly or all-time rankings
  - [Nice to Have] Show global average solve times.
- `/leaderboards turns` (only for guilds) get top guild players by number of turns to solve.
  - Show average guild solve turns.
  - If not in the top 10, show requester's rank
  - [NTH] `/leaderboards turns {'daily' | 'weekly' | 'monthly' | 'all'}` Add option to show daily, weekly, monthly or all-time rankings
- `/prefs` Customize what the Saltong Bot shows

## Tests

## UserData.play

- Show embed when cannot fetch current game data
- Do not run previous game reset setup when playing for the first time
- When previous game expired, show embed aside from the play embed
- Show embed when out of turns
- Show embed when already solved
- Show embed when won
- Show embed when lost
- Show embed when incorrect
