import asyncHandler from 'express-async-handler';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateProductDescription = asyncHandler(async (req, res) => {
  const { name, category, link, seed } = req.body || {};

  const makeFallback = () => {

    const s = Number(seed) || Date.now();
    function mulberry32(a) {
      return function() {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    const rand = mulberry32(s);
    const pick = (arr) => arr[Math.floor(rand() * arr.length)];
    const join = (parts) => parts.filter(Boolean).join(' ');

    const adjectives = ['reliable', 'dependable', 'well‑balanced', 'versatile', 'refined', 'thoughtful'];
    const verbs = ['simplifies', 'streamlines', 'enhances', 'elevates', 'supports'];
    const benefits = ['everyday tasks', 'workflows', 'study sessions', 'creative projects', 'home routines'];
    const users = ['students', 'remote workers', 'families', 'creators', 'travelers'];
    const traits = ['quiet performance', 'responsive controls', 'solid build quality', 'energy efficiency', 'long‑term reliability'];

    const sentences = [];
    const displayName = name || 'This product';
    const lowerCat = String(category || '').toLowerCase() || 'device';

    sentences.push(join([
      displayName,
      `is a ${pick(adjectives)} ${lowerCat} that ${pick(verbs)}`,
      pick(benefits) + ' with minimal effort.'
    ]));

    sentences.push(`Setup is straightforward, and you can get comfortable quickly without technical hurdles or guesswork.`);
    sentences.push(`Design choices emphasize clarity and comfort so you spend less time adjusting settings and more time getting results.`);
    sentences.push(`It offers ${pick(traits)} and day‑to‑day consistency you can trust.`);
    sentences.push(join([
      `Whether you are`, pick(['at home, on campus, or on the go,', 'working, learning, or relaxing,']),
      `it adapts naturally to your routine.`
    ]));
    sentences.push(join([
      `Many ${pick(users)} will appreciate the`, pick(['balanced features', 'practical details', 'refined ergonomics']),
      `that keep things simple without getting in your way.`
    ]));
    sentences.push(`If you are upgrading from older gear, expect smoother operation and a more polished overall experience.`);
    sentences.push(`Maintenance is simple, and helpful guidance keeps ownership stress‑free over time.`);
    sentences.push(`It is a smart choice if you value dependable tools that do exactly what they promise.`);
    sentences.push(link
      ? `Learn more or purchase using the provided link when you are ready.`
      : `Check availability with your preferred retailer to compare options and choose the best fit.`
    );


    for (let i = sentences.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
    }


    let out = '';
    while (out.split(/\s+/).filter(Boolean).length < 340) {
      out += (out ? ' ' : '') + sentences.join(' ');
    }
    return out.split(/\s+/).slice(0, 380).join(' ');
  };

  if (!name || !category) {
    return res.status(400).json({ message: 'Missing required fields: name and category' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ description: makeFallback() });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.0-pro'
    ];

    const randomnessHint = `${seed || Date.now()}-${Math.random().toString(36).slice(2)}`;
    const prompt = `Write an engaging, benefits-focused product description of about 150 words (target 130-170 words).
- Product name: ${name}
- Category: ${category}
- Reference link (optional to mention as a generic call-to-action): ${link || 'N/A'}
- Tone: professional, helpful, and trustworthy. Use short paragraphs and flowing sentences.
- Focus on practical benefits, ideal use cases, and what makes it stand out.
- Avoid lists and markdown. Plain text only.
- Randomness hint: ${randomnessHint}`;

    let generated = '';
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }]}],
          generationConfig: {
            temperature: 0.9,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 512,
          },
        });
        const text = result?.response?.text?.();
        if (text && text.trim()) {
          generated = text.trim();
          break;
        }
      } catch (innerErr) {

        console.warn(`Gemini model failed (${modelName}):`, innerErr?.message || innerErr);
      }
    }

    if (!generated) {

      generated = `${name} is a reliable ${category.toLowerCase()} designed for everyday use. It helps you get more done with a straightforward setup and dependable performance. Learn more or purchase through the provided link.`;
    }

    return res.json({ description: generated });
  } catch (err) {
    console.error('Gemini generation error (outer):', err?.message || err);

    const fallback = `${name} is a reliable ${category.toLowerCase()} designed for everyday use. It helps you get more done with a straightforward setup and dependable performance. Learn more or purchase through the provided link.`;
    return res.json({ description: fallback });
  }
});
