import { RtkError } from '../components/ErrorHandler';

// I didn't find info about resetting error so for now I will do this:
// This function ensures I have the latest error displayed in case more
// than 1 exists, that one will go to the ErrorHandler
type ErrorData = [RtkError, number];
const getLastError = (...errorData: Partial<ErrorData>[]) => {
  const lastError = errorData.reduce(
    ([prevError, prevTime], [currError, currTime]) => {
      return prevError && (!currError || (prevTime || 0) > (currTime || 0))
        ? [prevError, prevTime]
        : [currError, currTime];
    },
    [undefined, undefined],
  );

  return lastError[0];
};

export default getLastError;
