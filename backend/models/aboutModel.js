import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  body: { type: String, default: '' },
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);

export default About;


