const Tutor = require('../models/Tutor');

// Obtener todos los tutores (ejemplo)
exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.json(tutors);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Añadir disponibilidad (ejemplo)
exports.addAvailability = async (req, res) => {
  const { tutorId, availability } = req.body;
  try {
    let tutor = await Tutor.findById(tutorId);
    if (!tutor) {
      return res.status(404).json({ msg: 'Tutor no encontrado' });
    }
    tutor.availability.push(availability);
    await tutor.save();
    res.json(tutor);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};
