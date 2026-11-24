const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalized = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  return normalized === reversed;
};

const extractNumber = (input) => {
  const string = input.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }
  return parseInt(result, 10);
};

checkStringLength('проверяемая строка', 20);
isPalindrome('топот');
extractNumber('2023 год');

const parseTimeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const isMeetingWithinWorkingHours = (workStart, workEnd, meetingStart, duration) => {
  const startWorkMinutes = parseTimeToMinutes(workStart);
  const endWorkMinutes = parseTimeToMinutes(workEnd);
  const startMeetingMinutes = parseTimeToMinutes(meetingStart);
  const endMeetingMinutes = startMeetingMinutes + duration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};

isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90);

