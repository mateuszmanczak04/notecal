import { en } from '@/utils/dictionary';
import { z } from 'zod';

const UpdateDisplayedDaysSchema = z.object({
	displayedDays: z.coerce.number({
		required_error: en.settings.DISPLAYED_DAYS_REQUIRED,
	}),
});

export default UpdateDisplayedDaysSchema;
