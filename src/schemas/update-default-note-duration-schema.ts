import { en } from '@/utils/dictionary';
import { z } from 'zod';

const UpdateDefaultNoteDurationSchema = z.object({
	defaultNoteDuration: z.coerce.number({
		required_error: en.settings.DEFAULT_NOTE_DURATION_REQUIRED,
	}),
});

export default UpdateDefaultNoteDurationSchema;
