import { Pronote } from 'pawnote';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, username, password } = req.body;
    const session = await Pronote.login(url, username, password);
    
    // Récupérer les données...
    const userInfo = { name: session.user.name, class: session.user.className };
    const grades = await session.getGrades();
    
    res.json({ success: true, user: userInfo, grades: grades });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
}