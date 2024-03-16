import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	teacher: {
		type: String,
		required: false,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
});

export default mongoose.models.Course || mongoose.model('Course', courseSchema);
