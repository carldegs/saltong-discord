import axios from 'axios';
import { format } from 'date-fns';

import { SaltongMode, Game } from './types';
import { getPhDate } from './utils';

// TODO: Save to DB to reduce fetching from Saltong API
export const getGameData = async (
  mode: SaltongMode,
  date?: string | number
) => {
  const dateStr = format(date ? getPhDate(date) : getPhDate(), 'yyyy-MM-dd');
  const url = `https://saltong.carldegs.com/api/round/${mode}/${dateStr}`;

  const { data } = await axios.get<Game>(url);

  return data;
};
