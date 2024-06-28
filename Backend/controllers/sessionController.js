const Session = require('../models/Session');

// Obtener todas las sesiones (ejemplo)
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};

// Crear una nueva sesión (ejemplo)
exports.createSession = async (req, res) => {
  const { studentId, tutorId, date } = req.body;
  try {
    const newSession = new Session({
      studentId,
      tutorId,
      date
    });
    await newSession.save();
    res.json(newSession);
  } catch (err) {
    res.status(500).send('Error en el servidor');
  }
};
