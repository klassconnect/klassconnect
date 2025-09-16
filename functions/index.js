const functions = require('firebase-functions');
const { Pronote } = require('pawnote');
const { EcoleDirecte } = require('ecole-directe-node');

// === FONCTION PRONOTE ===
exports.pronoteLogin = functions.https.onCall(async (data, context) => {
  try {
    const { url, username, password } = data;
    
    const session = await Pronote.login(url, username, password);
    
    const userInfo = {
      name: session.user.name,
      class: session.user.className
    };
    
    const grades = await session.getGrades();
    const timetable = await session.getTimetable();
    const homework = await session.getHomework();
    
    return {
      success: true,
      user: userInfo,
      grades: grades,
      timetable: timetable,
      homework: homework
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

// === FONCTION ÉCOLE DIRECTE ===
exports.ecoledirecteLogin = functions.https.onCall(async (data, context) => {
  try {
    const { username, password } = data;
    
    const session = new EcoleDirecte();
    await session.login(username, password);
    
    const userInfo = await session.getUserInfo();
    const grades = await session.getGrades();
    const homework = await session.getHomework();
    
    return {
      success: true,
      user: userInfo,
      grades: grades,
      homework: homework
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});