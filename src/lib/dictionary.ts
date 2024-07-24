export const en = {
	SOMETHING_WENT_WRONG: 'Something went wrong, please try again later',
	INVALID_DATA: 'Invalid data',
	INVALID_CREDENTIALS: 'Invalid credentials',
	courses: {
		ID_REQUIRED: 'Course id is required',
		NAME_REQUIRED: 'Name is required',
		MAX_NAME_LENGTH: 'Maximum course name length is 60 characters',
		TEACHER_REQUIRED: 'Teacher name is required',
		MAX_TEACHER_NAME_LENGTH: 'Maximum teacher name length is 40 characters',
		NOT_FOUND: 'Course not found',
		COLOR_REQUIRED: 'Color is required',
		INVALID_COLOR: 'Invalid color hex',
	},
	notes: {
		ID_REQUIRED: 'Note id is required',
	},
	tasks: {
		ID_REQUIRED: 'Task id is required',
		NOT_FOUND: 'Task not found',
		TITLE_REQUIRED: 'Title is required',
		MAX_TITLE_LENGTH: 'Maximum title length is 60 characters',
		MAX_DESCRIPTION_LENGTH: 'Maximum description length is 300 characters',
	},
	auth: {
		UNAUTHENTICATED: 'Unauthenticated',
		USER_DOES_NOT_EXIST: 'User does not exist',
		EMAIL_REQUIRED: 'Email is required',
		EMAIL_TAKEN: 'Email is already taken',
		OLD_PASSWORD_REQUIRED: 'Old password is required.',
		PASSWORD_REQUIRED: 'Password is required',
		PASSWORD_UPDATED: 'Password updated successfully',
		MIN_PASSWORD_LENGTH: 'Minimum password length is 6 characters.',
		PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
		WRONG_PASSWORD: 'Wrong password',
		TOKEN_REQUIRED: 'Token is required',
		INVALID_TOKEN: 'Invalid token',
		TOKEN_EXPIRED: 'Token has expired',
		CONFIRMATION_EMAIL_SENT:
			'Confirmation email has been sent, check your inbox',
		EMAIL_ALREADY_SENT: 'Email has already been sent',
		CONFIRM_EMAIL_FIRST:
			"In order to login, you have to confirm your email first. If you didn't get an email try repeating registration flow again",
	},
	settings: {
		DEFAULT_NOTE_DURATION_REQUIRED: 'Default note duration is required',
		DISPLAYED_DAYS_REQUIRED: 'Displayed days amount is required',
	},
};
