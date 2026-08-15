import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface SaturationTestModalProps {
  currentLang: Language;
  onClose: () => void;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

interface Screen {
  title: string;
  subtitle: string;
  questions: Question[];
}

// ─── Translations ─────────────────────────────────────────────────────────────
const testContent: Record<Language, {
  modalTitle: string;
  progressLabel: string;
  screenLabel: string;
  nextBtn: string;
  prevBtn: string;
  finishBtn: string;
  restartBtn: string;
  resultTitle: string;
  resultSubtitle: string;
  ctaBtn: string;
  levels: { range: [number, number]; label: string; desc: string; emoji: string; color: string }[];
  screens: Screen[];
}> = {
  es: {
    modalTitle: "Test de Saturación Digital",
    progressLabel: "Pantalla",
    screenLabel: "de",
    nextBtn: "Siguiente",
    prevBtn: "Anterior",
    finishBtn: "Ver mi resultado",
    restartBtn: "Repetir el test",
    resultTitle: "Tu nivel de saturación:",
    resultSubtitle: "Este es tu diagnóstico de desconexión digital",
    ctaBtn: "Encontrar mi Refugio Ideal",
    levels: [
      { range: [0, 24], label: "Equilibrado", desc: "Tu relación con el entorno digital es saludable. Aun así, un retiro en la naturaleza potenciará tu bienestar.", emoji: "🌿", color: "#22c55e" },
      { range: [25, 49], label: "En alerta", desc: "Señales tempranas de saturación. Te recomendamos desconectar al menos un fin de semana al mes.", emoji: "🌤", color: "#f59e0b" },
      { range: [50, 74], label: "Saturado", desc: "Tu sistema necesita una pausa real. Escápate de las pantallas y elige un retiro de naturaleza regenerativa.", emoji: "🔋", color: "#f97316" },
      { range: [75, 100], label: "Colapso Digital", desc: "Nivel crítico. Tus reservas mentales están casi agotadas. Un refugio en la naturaleza es urgente y necesario.", emoji: "🆘", color: "#ef4444" },
    ],
    screens: [
      {
        title: "Ritmo y Sueño",
        subtitle: "¿Cómo es tu relación con el descanso?",
        questions: [
          {
            id: "s1q1",
            text: "¿Con qué frecuencia revisas el móvil antes de dormir?",
            options: [
              { value: 0, label: "Rara vez o nunca" },
              { value: 1, label: "A veces, 1-2 veces/semana" },
              { value: 2, label: "Casi siempre, varias noches" },
              { value: 3, label: "Siempre, cada noche" },
            ],
          },
          {
            id: "s1q2",
            text: "¿Cuántas horas de sueño continuo duermes habitualmente?",
            options: [
              { value: 0, label: "7-9 horas, me despierto descansado" },
              { value: 1, label: "6-7 horas, aceptable" },
              { value: 2, label: "5-6 horas, con interrupciones" },
              { value: 3, label: "Menos de 5 horas o muy fragmentado" },
            ],
          },
          {
            id: "s1q3",
            text: "¿Con qué frecuencia te despiertas ya pensando en tareas pendientes?",
            options: [
              { value: 0, label: "Casi nunca, inicio el día tranquilo" },
              { value: 1, label: "Ocasionalmente" },
              { value: 2, label: "Con bastante frecuencia" },
              { value: 3, label: "Casi siempre, es la norma" },
            ],
          },
        ],
      },
      {
        title: "Atención y Foco",
        subtitle: "¿Puedes mantener el foco sin distracciones?",
        questions: [
          {
            id: "s2q1",
            text: "¿Cuánto tiempo puedes concentrarte en una sola tarea sin revisar el móvil o redes sociales?",
            options: [
              { value: 0, label: "Más de 90 minutos con facilidad" },
              { value: 1, label: "45-90 minutos" },
              { value: 2, label: "15-45 minutos" },
              { value: 3, label: "Menos de 15 minutos" },
            ],
          },
          {
            id: "s2q2",
            text: "¿Sientes ansiedad cuando no tienes cobertura o acceso a internet?",
            options: [
              { value: 0, label: "No, me resulta liberador" },
              { value: 1, label: "Un ligero malestar" },
              { value: 2, label: "Bastante ansiedad" },
              { value: 3, label: "Ansiedad intensa, no tolero desconectarme" },
            ],
          },
          {
            id: "s2q3",
            text: "¿Con qué frecuencia interrumpes una conversación en persona para mirar el móvil?",
            options: [
              { value: 0, label: "Nunca o casi nunca" },
              { value: 1, label: "Solo en casos urgentes" },
              { value: 2, label: "Con cierta frecuencia" },
              { value: 3, label: "Con mucha frecuencia, es automático" },
            ],
          },
        ],
      },
      {
        title: "Cuerpo y Energía",
        subtitle: "¿Cómo responde tu cuerpo al mundo digital?",
        questions: [
          {
            id: "s3q1",
            text: "¿Con qué frecuencia sientes tensión física (cabeza, cuello, ojos) relacionada con pantallas?",
            options: [
              { value: 0, label: "Rara vez o nunca" },
              { value: 1, label: "Ocasionalmente" },
              { value: 2, label: "Varias veces a la semana" },
              { value: 3, label: "Casi a diario" },
            ],
          },
          {
            id: "s3q2",
            text: "¿Cuántas horas diarias pasas frente a pantallas (trabajo + ocio)?",
            options: [
              { value: 0, label: "Menos de 4 horas" },
              { value: 1, label: "4-6 horas" },
              { value: 2, label: "6-10 horas" },
              { value: 3, label: "Más de 10 horas" },
            ],
          },
          {
            id: "s3q3",
            text: "¿Cuándo fue la última vez que pasaste un día completo en la naturaleza sin móvil?",
            options: [
              { value: 0, label: "En las últimas 2 semanas" },
              { value: 1, label: "Hace 1-2 meses" },
              { value: 2, label: "Hace más de 6 meses" },
              { value: 3, label: "No recuerdo o hace más de 1 año" },
            ],
          },
        ],
      },
      {
        title: "Emociones y Presencia",
        subtitle: "¿Cómo estás emocionalmente en el mundo digital?",
        questions: [
          {
            id: "s4q1",
            text: "¿Con qué frecuencia te comparas con otros en redes sociales y sientes malestar?",
            options: [
              { value: 0, label: "Casi nunca, me siento bien conmigo mismo" },
              { value: 1, label: "Ocasionalmente" },
              { value: 2, label: "Con bastante frecuencia" },
              { value: 3, label: "Constantemente, afecta mi estado de ánimo" },
            ],
          },
          {
            id: "s4q2",
            text: "¿Sientes que el trabajo o las obligaciones digitales invaden tu tiempo personal y familiar?",
            options: [
              { value: 0, label: "No, tengo fronteras claras" },
              { value: 1, label: "A veces, en momentos de mucho trabajo" },
              { value: 2, label: "Sí, con bastante frecuencia" },
              { value: 3, label: "Sí, casi siempre sin límites" },
            ],
          },
          {
            id: "s4q3",
            text: "¿Con qué frecuencia deseas escapar del ritmo urbano y digital para reconectar con la naturaleza?",
            options: [
              { value: 0, label: "Ocasionalmente, sin urgencia" },
              { value: 1, label: "Con cierta regularidad" },
              { value: 2, label: "Con frecuencia, es una necesidad" },
              { value: 3, label: "Es un deseo constante e intenso" },
            ],
          },
        ],
      },
    ],
  },
  en: {
    modalTitle: "Digital Saturation Test",
    progressLabel: "Screen",
    screenLabel: "of",
    nextBtn: "Next",
    prevBtn: "Previous",
    finishBtn: "See my result",
    restartBtn: "Retake the test",
    resultTitle: "Your saturation level:",
    resultSubtitle: "Your digital disconnection diagnosis",
    ctaBtn: "Find my Ideal Sanctuary",
    levels: [
      { range: [0, 24], label: "Balanced", desc: "Your relationship with digital is healthy. Still, a nature retreat will enhance your wellbeing.", emoji: "🌿", color: "#22c55e" },
      { range: [25, 49], label: "Early Warning", desc: "Early signs of saturation. We recommend unplugging at least one weekend per month.", emoji: "🌤", color: "#f59e0b" },
      { range: [50, 74], label: "Saturated", desc: "Your system needs a real pause. Escape screens and choose a regenerative nature retreat.", emoji: "🔋", color: "#f97316" },
      { range: [75, 100], label: "Digital Collapse", desc: "Critical level. Your mental reserves are nearly depleted. A nature sanctuary is urgent.", emoji: "🆘", color: "#ef4444" },
    ],
    screens: [
      {
        title: "Rhythm & Sleep",
        subtitle: "How is your relationship with rest?",
        questions: [
          {
            id: "s1q1",
            text: "How often do you check your phone before sleeping?",
            options: [
              { value: 0, label: "Rarely or never" },
              { value: 1, label: "Sometimes, 1-2 nights/week" },
              { value: 2, label: "Most nights" },
              { value: 3, label: "Every single night" },
            ],
          },
          {
            id: "s1q2",
            text: "How many hours of continuous sleep do you usually get?",
            options: [
              { value: 0, label: "7-9 hours, I wake refreshed" },
              { value: 1, label: "6-7 hours, acceptable" },
              { value: 2, label: "5-6 hours, interrupted" },
              { value: 3, label: "Under 5 hours or highly fragmented" },
            ],
          },
          {
            id: "s1q3",
            text: "How often do you wake up already thinking about tasks?",
            options: [
              { value: 0, label: "Rarely, I start the day calm" },
              { value: 1, label: "Occasionally" },
              { value: 2, label: "Fairly often" },
              { value: 3, label: "Almost always, it's my default" },
            ],
          },
        ],
      },
      {
        title: "Attention & Focus",
        subtitle: "Can you sustain focus without distraction?",
        questions: [
          {
            id: "s2q1",
            text: "How long can you focus on one task without checking your phone or social media?",
            options: [
              { value: 0, label: "Over 90 minutes easily" },
              { value: 1, label: "45-90 minutes" },
              { value: 2, label: "15-45 minutes" },
              { value: 3, label: "Under 15 minutes" },
            ],
          },
          {
            id: "s2q2",
            text: "Do you feel anxious when you have no signal or internet access?",
            options: [
              { value: 0, label: "No, I find it liberating" },
              { value: 1, label: "Mild discomfort" },
              { value: 2, label: "Considerable anxiety" },
              { value: 3, label: "Intense anxiety, I can't tolerate being offline" },
            ],
          },
          {
            id: "s2q3",
            text: "How often do you interrupt an in-person conversation to look at your phone?",
            options: [
              { value: 0, label: "Never or almost never" },
              { value: 1, label: "Only for genuine emergencies" },
              { value: 2, label: "Occasionally" },
              { value: 3, label: "Very often, it's automatic" },
            ],
          },
        ],
      },
      {
        title: "Body & Energy",
        subtitle: "How does your body respond to the digital world?",
        questions: [
          {
            id: "s3q1",
            text: "How often do you feel physical tension (headache, neck, eye strain) related to screens?",
            options: [
              { value: 0, label: "Rarely or never" },
              { value: 1, label: "Occasionally" },
              { value: 2, label: "Several times a week" },
              { value: 3, label: "Almost daily" },
            ],
          },
          {
            id: "s3q2",
            text: "How many hours daily do you spend in front of screens (work + leisure)?",
            options: [
              { value: 0, label: "Under 4 hours" },
              { value: 1, label: "4-6 hours" },
              { value: 2, label: "6-10 hours" },
              { value: 3, label: "Over 10 hours" },
            ],
          },
          {
            id: "s3q3",
            text: "When was the last time you spent a full day in nature without a phone?",
            options: [
              { value: 0, label: "In the last 2 weeks" },
              { value: 1, label: "1-2 months ago" },
              { value: 2, label: "Over 6 months ago" },
              { value: 3, label: "I don't remember or over 1 year" },
            ],
          },
        ],
      },
      {
        title: "Emotions & Presence",
        subtitle: "How are you doing emotionally in the digital world?",
        questions: [
          {
            id: "s4q1",
            text: "How often do you compare yourself with others on social media and feel discomfort?",
            options: [
              { value: 0, label: "Almost never, I feel good about myself" },
              { value: 1, label: "Occasionally" },
              { value: 2, label: "Fairly often" },
              { value: 3, label: "Constantly, it affects my mood" },
            ],
          },
          {
            id: "s4q2",
            text: "Do digital work or obligations invade your personal or family time?",
            options: [
              { value: 0, label: "No, I have clear boundaries" },
              { value: 1, label: "Sometimes, during busy periods" },
              { value: 2, label: "Yes, quite frequently" },
              { value: 3, label: "Yes, almost always without limits" },
            ],
          },
          {
            id: "s4q3",
            text: "How often do you crave escaping the urban-digital pace to reconnect with nature?",
            options: [
              { value: 0, label: "Occasionally, no urgency" },
              { value: 1, label: "With some regularity" },
              { value: 2, label: "Often, it feels like a need" },
              { value: 3, label: "Constantly and intensely" },
            ],
          },
        ],
      },
    ],
  },
  fr: {
    modalTitle: "Test de Saturation Numérique",
    progressLabel: "Écran",
    screenLabel: "sur",
    nextBtn: "Suivant",
    prevBtn: "Précédent",
    finishBtn: "Voir mon résultat",
    restartBtn: "Refaire le test",
    resultTitle: "Votre niveau de saturation :",
    resultSubtitle: "Votre diagnostic de déconnexion numérique",
    ctaBtn: "Trouver mon Sanctuaire Idéal",
    levels: [
      { range: [0, 24], label: "Équilibré", desc: "Votre rapport au numérique est sain. Une retraite en nature amplifiera votre bien-être.", emoji: "🌿", color: "#22c55e" },
      { range: [25, 49], label: "En alerte", desc: "Premiers signes de saturation. Déconnectez-vous au moins un week-end par mois.", emoji: "🌤", color: "#f59e0b" },
      { range: [50, 74], label: "Saturé", desc: "Votre système a besoin d'une vraie pause. Fuyez les écrans et choisissez une retraite régénératrice.", emoji: "🔋", color: "#f97316" },
      { range: [75, 100], label: "Effondrement Numérique", desc: "Niveau critique. Vos réserves mentales sont presque épuisées. Un séjour en nature est urgent.", emoji: "🆘", color: "#ef4444" },
    ],
    screens: [
      {
        title: "Rythme et Sommeil",
        subtitle: "Quelle est votre relation avec le repos ?",
        questions: [
          {
            id: "s1q1",
            text: "À quelle fréquence consultez-vous votre téléphone avant de dormir ?",
            options: [
              { value: 0, label: "Rarement ou jamais" },
              { value: 1, label: "Parfois, 1-2 nuits/semaine" },
              { value: 2, label: "La plupart des nuits" },
              { value: 3, label: "Chaque nuit sans exception" },
            ],
          },
          {
            id: "s1q2",
            text: "Combien d'heures de sommeil continu dormez-vous habituellement ?",
            options: [
              { value: 0, label: "7-9 heures, je me réveille reposé" },
              { value: 1, label: "6-7 heures, acceptable" },
              { value: 2, label: "5-6 heures, avec interruptions" },
              { value: 3, label: "Moins de 5 heures ou très fragmenté" },
            ],
          },
          {
            id: "s1q3",
            text: "À quelle fréquence vous réveillez-vous déjà en pensant aux tâches ?",
            options: [
              { value: 0, label: "Rarement, je commence la journée serein" },
              { value: 1, label: "Occasionnellement" },
              { value: 2, label: "Assez souvent" },
              { value: 3, label: "Presque toujours, c'est la norme" },
            ],
          },
        ],
      },
      {
        title: "Attention et Concentration",
        subtitle: "Pouvez-vous maintenir votre concentration ?",
        questions: [
          {
            id: "s2q1",
            text: "Combien de temps pouvez-vous vous concentrer sur une seule tâche sans consulter votre téléphone ?",
            options: [
              { value: 0, label: "Plus de 90 minutes facilement" },
              { value: 1, label: "45-90 minutes" },
              { value: 2, label: "15-45 minutes" },
              { value: 3, label: "Moins de 15 minutes" },
            ],
          },
          {
            id: "s2q2",
            text: "Ressentez-vous de l'anxiété quand vous n'avez pas de réseau ?",
            options: [
              { value: 0, label: "Non, je trouve ça libérateur" },
              { value: 1, label: "Un léger malaise" },
              { value: 2, label: "Une anxiété notable" },
              { value: 3, label: "Anxiété intense, je ne supporte pas d'être hors ligne" },
            ],
          },
          {
            id: "s2q3",
            text: "À quelle fréquence interrompez-vous une conversation pour regarder votre téléphone ?",
            options: [
              { value: 0, label: "Jamais ou presque" },
              { value: 1, label: "Seulement pour de vraies urgences" },
              { value: 2, label: "Assez souvent" },
              { value: 3, label: "Très fréquemment, c'est automatique" },
            ],
          },
        ],
      },
      {
        title: "Corps et Énergie",
        subtitle: "Comment votre corps réagit-il au monde numérique ?",
        questions: [
          {
            id: "s3q1",
            text: "À quelle fréquence ressentez-vous des tensions physiques liées aux écrans ?",
            options: [
              { value: 0, label: "Rarement ou jamais" },
              { value: 1, label: "Occasionnellement" },
              { value: 2, label: "Plusieurs fois par semaine" },
              { value: 3, label: "Presque chaque jour" },
            ],
          },
          {
            id: "s3q2",
            text: "Combien d'heures par jour passez-vous devant des écrans (travail + loisirs) ?",
            options: [
              { value: 0, label: "Moins de 4 heures" },
              { value: 1, label: "4-6 heures" },
              { value: 2, label: "6-10 heures" },
              { value: 3, label: "Plus de 10 heures" },
            ],
          },
          {
            id: "s3q3",
            text: "Quand avez-vous passé une journée entière en nature sans téléphone pour la dernière fois ?",
            options: [
              { value: 0, label: "Ces deux dernières semaines" },
              { value: 1, label: "Il y a 1-2 mois" },
              { value: 2, label: "Il y a plus de 6 mois" },
              { value: 3, label: "Je ne me souviens pas ou plus d'un an" },
            ],
          },
        ],
      },
      {
        title: "Émotions et Présence",
        subtitle: "Comment allez-vous émotionnellement dans le monde numérique ?",
        questions: [
          {
            id: "s4q1",
            text: "À quelle fréquence vous comparez-vous aux autres sur les réseaux et ressentez-vous un malaise ?",
            options: [
              { value: 0, label: "Presque jamais, je me sens bien dans ma peau" },
              { value: 1, label: "Occasionnellement" },
              { value: 2, label: "Assez souvent" },
              { value: 3, label: "Constamment, ça affecte mon humeur" },
            ],
          },
          {
            id: "s4q2",
            text: "Les obligations numériques envahissent-elles votre temps personnel ou familial ?",
            options: [
              { value: 0, label: "Non, j'ai des frontières claires" },
              { value: 1, label: "Parfois, en période chargée" },
              { value: 2, label: "Oui, assez fréquemment" },
              { value: 3, label: "Oui, presque toujours sans limites" },
            ],
          },
          {
            id: "s4q3",
            text: "À quelle fréquence souhaitez-vous fuir le rythme urbain-numérique pour vous reconnecter à la nature ?",
            options: [
              { value: 0, label: "Occasionnellement, sans urgence" },
              { value: 1, label: "Régulièrement" },
              { value: 2, label: "Souvent, c'est un besoin" },
              { value: 3, label: "Constamment et intensément" },
            ],
          },
        ],
      },
    ],
  },
  cat: {
    modalTitle: "Test de Saturació Digital",
    progressLabel: "Pantalla",
    screenLabel: "de",
    nextBtn: "Següent",
    prevBtn: "Anterior",
    finishBtn: "Veure el meu resultat",
    restartBtn: "Repetir el test",
    resultTitle: "El teu nivell de saturació:",
    resultSubtitle: "El teu diagnòstic de desconnexió digital",
    ctaBtn: "Trobar el meu Refugi Ideal",
    levels: [
      { range: [0, 24], label: "Equilibrat", desc: "La teva relació amb el digital és saludable. Un retir a la natura potenciarà el teu benestar.", emoji: "🌿", color: "#22c55e" },
      { range: [25, 49], label: "En alerta", desc: "Senyals primerenques de saturació. Et recomanem desconnectar almenys un cap de setmana al mes.", emoji: "🌤", color: "#f59e0b" },
      { range: [50, 74], label: "Saturat", desc: "El teu sistema necessita una pausa real. Fuig de les pantalles i tria un retir de natura regenerativa.", emoji: "🔋", color: "#f97316" },
      { range: [75, 100], label: "Col·lapse Digital", desc: "Nivell crític. Les teves reserves mentals estan quasi exhaurides. Un refugi a la natura és urgent.", emoji: "🆘", color: "#ef4444" },
    ],
    screens: [
      {
        title: "Ritme i Son",
        subtitle: "Com és la teva relació amb el descans?",
        questions: [
          { id: "s1q1", text: "Amb quina freqüència consultes el mòbil abans de dormir?", options: [{ value: 0, label: "Rarament o mai" }, { value: 1, label: "De vegades, 1-2 nits/setmana" }, { value: 2, label: "Gairebé cada nit" }, { value: 3, label: "Cada nit sense excepció" }] },
          { id: "s1q2", text: "Quantes hores de son continu dormes habitualment?", options: [{ value: 0, label: "7-9 hores, em llevo descansat" }, { value: 1, label: "6-7 hores, acceptable" }, { value: 2, label: "5-6 hores, amb interrupcions" }, { value: 3, label: "Menys de 5 hores o molt fragmentat" }] },
          { id: "s1q3", text: "Amb quina freqüència et lleves ja pensant en tasques?", options: [{ value: 0, label: "Gairebé mai, inicio el dia tranquil" }, { value: 1, label: "Ocasionalment" }, { value: 2, label: "Força sovint" }, { value: 3, label: "Gairebé sempre, és la norma" }] },
        ],
      },
      {
        title: "Atenció i Focus",
        subtitle: "Pots mantenir la concentració sense distraccions?",
        questions: [
          { id: "s2q1", text: "Quant temps pots concentrar-te en una sola tasca sense revisar el mòbil?", options: [{ value: 0, label: "Més de 90 minuts fàcilment" }, { value: 1, label: "45-90 minuts" }, { value: 2, label: "15-45 minuts" }, { value: 3, label: "Menys de 15 minuts" }] },
          { id: "s2q2", text: "Sents ansietat quan no tens cobertura o accés a internet?", options: [{ value: 0, label: "No, m'allibera" }, { value: 1, label: "Un lleuger malestar" }, { value: 2, label: "Força ansietat" }, { value: 3, label: "Ansietat intensa, no tolero estar desconnectat" }] },
          { id: "s2q3", text: "Amb quina freqüència interromps una conversa en persona per mirar el mòbil?", options: [{ value: 0, label: "Mai o gairebé mai" }, { value: 1, label: "Només per urgències reals" }, { value: 2, label: "Amb certa freqüència" }, { value: 3, label: "Molt sovint, és automàtic" }] },
        ],
      },
      {
        title: "Cos i Energia",
        subtitle: "Com respon el teu cos al món digital?",
        questions: [
          { id: "s3q1", text: "Amb quina freqüència sents tensió física relacionada amb pantalles?", options: [{ value: 0, label: "Rarament o mai" }, { value: 1, label: "Ocasionalment" }, { value: 2, label: "Diverses vegades a la setmana" }, { value: 3, label: "Gairebé cada dia" }] },
          { id: "s3q2", text: "Quantes hores diàries passes davant de pantalles (feina + oci)?", options: [{ value: 0, label: "Menys de 4 hores" }, { value: 1, label: "4-6 hores" }, { value: 2, label: "6-10 hores" }, { value: 3, label: "Més de 10 hores" }] },
          { id: "s3q3", text: "Quan va ser l'última vegada que vas passar un dia sencer a la natura sense mòbil?", options: [{ value: 0, label: "En les darreres 2 setmanes" }, { value: 1, label: "Fa 1-2 mesos" }, { value: 2, label: "Fa més de 6 mesos" }, { value: 3, label: "No recordo o fa més d'un any" }] },
        ],
      },
      {
        title: "Emocions i Presència",
        subtitle: "Com estàs emocionalment en el món digital?",
        questions: [
          { id: "s4q1", text: "Amb quina freqüència et compares amb altres a les xarxes i sents malestar?", options: [{ value: 0, label: "Gairebé mai, em sento bé amb mi mateix" }, { value: 1, label: "Ocasionalment" }, { value: 2, label: "Força sovint" }, { value: 3, label: "Constantment, afecta el meu estat d'ànim" }] },
          { id: "s4q2", text: "Les obligacions digitals envaeixen el teu temps personal o familiar?", options: [{ value: 0, label: "No, tinc fronteres clares" }, { value: 1, label: "De vegades, en moments de molta feina" }, { value: 2, label: "Sí, força sovint" }, { value: 3, label: "Sí, gairebé sempre sense límits" }] },
          { id: "s4q3", text: "Amb quina freqüència desitges fugir del ritme urbà-digital per reconnectar amb la natura?", options: [{ value: 0, label: "Ocasionalment, sense urgència" }, { value: 1, label: "Amb certa regularitat" }, { value: 2, label: "Sovint, és una necessitat" }, { value: 3, label: "Constantment i intensament" }] },
        ],
      },
    ],
  },
  pt: {
    modalTitle: "Teste de Saturação Digital",
    progressLabel: "Ecrã",
    screenLabel: "de",
    nextBtn: "Seguinte",
    prevBtn: "Anterior",
    finishBtn: "Ver o meu resultado",
    restartBtn: "Repetir o teste",
    resultTitle: "O seu nível de saturação:",
    resultSubtitle: "O seu diagnóstico de desconexão digital",
    ctaBtn: "Encontrar o meu Refúgio Ideal",
    levels: [
      { range: [0, 24], label: "Equilibrado", desc: "A sua relação com o digital é saudável. Ainda assim, um retiro na natureza potenciará o seu bem-estar.", emoji: "🌿", color: "#22c55e" },
      { range: [25, 49], label: "Em alerta", desc: "Primeiros sinais de saturação. Recomendamos desligar pelo menos um fim de semana por mês.", emoji: "🌤", color: "#f59e0b" },
      { range: [50, 74], label: "Saturado", desc: "O seu sistema precisa de uma pausa real. Fuja dos ecrãs e escolha um retiro de natureza regenerativa.", emoji: "🔋", color: "#f97316" },
      { range: [75, 100], label: "Colapso Digital", desc: "Nível crítico. As suas reservas mentais estão quase esgotadas. Um refúgio na natureza é urgente.", emoji: "🆘", color: "#ef4444" },
    ],
    screens: [
      {
        title: "Ritmo e Sono",
        subtitle: "Como é a sua relação com o descanso?",
        questions: [
          { id: "s1q1", text: "Com que frequência consulta o telemóvel antes de dormir?", options: [{ value: 0, label: "Raramente ou nunca" }, { value: 1, label: "Às vezes, 1-2 noites/semana" }, { value: 2, label: "Quase todas as noites" }, { value: 3, label: "Todas as noites sem exceção" }] },
          { id: "s1q2", text: "Quantas horas de sono contínuo dorme habitualmente?", options: [{ value: 0, label: "7-9 horas, acordo descansado" }, { value: 1, label: "6-7 horas, aceitável" }, { value: 2, label: "5-6 horas, com interrupções" }, { value: 3, label: "Menos de 5 horas ou muito fragmentado" }] },
          { id: "s1q3", text: "Com que frequência acorda já a pensar em tarefas?", options: [{ value: 0, label: "Raramente, inicio o dia tranquilo" }, { value: 1, label: "Ocasionalmente" }, { value: 2, label: "Com bastante frequência" }, { value: 3, label: "Quase sempre, é a norma" }] },
        ],
      },
      {
        title: "Atenção e Foco",
        subtitle: "Consegue manter o foco sem distrações?",
        questions: [
          { id: "s2q1", text: "Quanto tempo consegue concentrar-se numa única tarefa sem verificar o telemóvel?", options: [{ value: 0, label: "Mais de 90 minutos facilmente" }, { value: 1, label: "45-90 minutos" }, { value: 2, label: "15-45 minutos" }, { value: 3, label: "Menos de 15 minutos" }] },
          { id: "s2q2", text: "Sente ansiedade quando não tem cobertura ou acesso à internet?", options: [{ value: 0, label: "Não, acho libertador" }, { value: 1, label: "Um leve desconforto" }, { value: 2, label: "Ansiedade considerável" }, { value: 3, label: "Ansiedade intensa, não tolero estar offline" }] },
          { id: "s2q3", text: "Com que frequência interrompe uma conversa pessoal para ver o telemóvel?", options: [{ value: 0, label: "Nunca ou quase nunca" }, { value: 1, label: "Só para urgências reais" }, { value: 2, label: "Com alguma frequência" }, { value: 3, label: "Muito frequentemente, é automático" }] },
        ],
      },
      {
        title: "Corpo e Energia",
        subtitle: "Como responde o seu corpo ao mundo digital?",
        questions: [
          { id: "s3q1", text: "Com que frequência sente tensão física (cabeça, pescoço, olhos) relacionada com ecrãs?", options: [{ value: 0, label: "Raramente ou nunca" }, { value: 1, label: "Ocasionalmente" }, { value: 2, label: "Várias vezes por semana" }, { value: 3, label: "Quase diariamente" }] },
          { id: "s3q2", text: "Quantas horas diárias passa em frente a ecrãs (trabalho + lazer)?", options: [{ value: 0, label: "Menos de 4 horas" }, { value: 1, label: "4-6 horas" }, { value: 2, label: "6-10 horas" }, { value: 3, label: "Mais de 10 horas" }] },
          { id: "s3q3", text: "Quando foi a última vez que passou um dia inteiro na natureza sem telemóvel?", options: [{ value: 0, label: "Nas últimas 2 semanas" }, { value: 1, label: "Há 1-2 meses" }, { value: 2, label: "Há mais de 6 meses" }, { value: 3, label: "Não me lembro ou há mais de 1 ano" }] },
        ],
      },
      {
        title: "Emoções e Presença",
        subtitle: "Como está emocionalmente no mundo digital?",
        questions: [
          { id: "s4q1", text: "Com que frequência se compara com outros nas redes sociais e sente desconforto?", options: [{ value: 0, label: "Quase nunca, sinto-me bem comigo mesmo" }, { value: 1, label: "Ocasionalmente" }, { value: 2, label: "Com bastante frequência" }, { value: 3, label: "Constantemente, afeta o meu estado de humor" }] },
          { id: "s4q2", text: "As obrigações digitais invadem o seu tempo pessoal ou familiar?", options: [{ value: 0, label: "Não, tenho fronteiras claras" }, { value: 1, label: "Às vezes, em períodos intensos" }, { value: 2, label: "Sim, com bastante frequência" }, { value: 3, label: "Sim, quase sempre sem limites" }] },
          { id: "s4q3", text: "Com que frequência deseja escapar do ritmo urbano-digital para reconectar com a natureza?", options: [{ value: 0, label: "Ocasionalmente, sem urgência" }, { value: 1, label: "Com alguma regularidade" }, { value: 2, label: "Frequentemente, é uma necessidade" }, { value: 3, label: "Constantemente e intensamente" }] },
        ],
      },
    ],
  },
};

// ─── Component ────────────────────────────────────────────────────────────────
export const SaturationTestModal: React.FC<SaturationTestModalProps> = ({ currentLang, onClose }) => {
  const content = testContent[currentLang];
  const TOTAL_SCREENS = content.screens.length;

  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [finished, setFinished] = useState(false);

  const screen = content.screens[currentScreen];

  const allQuestionsAnswered = screen.questions.every((q) => answers[q.id] !== undefined);

  const totalScore = (Object.values(answers) as number[]).reduce((sum: number, v: number) => sum + v, 0);
  // Max possible: 12 questions * 3 = 36 → normalize to 0-100
  const normalizedScore = Math.round((totalScore / 36) * 100);

  const resultLevel = content.levels.find(
    (l) => normalizedScore >= l.range[0] && normalizedScore <= l.range[1]
  ) || content.levels[content.levels.length - 1];

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentScreen < TOTAL_SCREENS - 1) {
      setCurrentScreen((s) => s + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentScreen > 0) setCurrentScreen((s) => s - 1);
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentScreen(0);
    setFinished(false);
  };

  const handleCta = () => {
    onClose();
    const el = document.getElementById('quiz');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative bg-[#121a16] border border-[#c5a059]/40 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#121a16] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#c5a059]" />
            <h2 className="font-bold text-sm uppercase tracking-widest text-[#e5c07b]">
              {content.modalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-5">
          {!finished ? (
            <>
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2 uppercase tracking-wider">
                  <span>{content.progressLabel} {currentScreen + 1} {content.screenLabel} {TOTAL_SCREENS}</span>
                  <span>{Math.round(((currentScreen + 1) / TOTAL_SCREENS) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c5a059] rounded-full transition-all duration-500"
                    style={{ width: `${((currentScreen + 1) / TOTAL_SCREENS) * 100}%` }}
                  />
                </div>
              </div>

              {/* Screen Title */}
              <div className="mb-6">
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-1">{screen.title}</h3>
                <p className="text-sm text-gray-400 font-light">{screen.subtitle}</p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {screen.questions.map((question, qIdx) => (
                  <div key={question.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm font-semibold text-white mb-3 leading-relaxed">
                      <span className="text-[#c5a059] font-bold mr-2">{qIdx + 1}.</span>
                      {question.text}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {question.options.map((opt) => {
                        const isSelected = answers[question.id] === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleAnswer(question.id, opt.value)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border flex items-center gap-2 ${
                              isSelected
                                ? 'bg-[#c5a059]/20 border-[#c5a059] text-[#e5c07b]'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-[#c5a059]/40 hover:text-white'
                            }`}
                          >
                            <span className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${
                              isSelected ? 'border-[#c5a059] bg-[#c5a059]' : 'border-gray-500'
                            }`}>
                              {isSelected && <CheckCircle2 className="w-3 h-3 text-black" />}
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={handlePrev}
                  disabled={currentScreen === 0}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> {content.prevBtn}
                </button>
                <button
                  onClick={handleNext}
                  disabled={!allQuestionsAnswered}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    allQuestionsAnswered
                      ? 'bg-[#c5a059] hover:bg-[#e5c07b] text-black shadow-lg shadow-[#c5a059]/20'
                      : 'bg-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentScreen === TOTAL_SCREENS - 1 ? content.finishBtn : content.nextBtn}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* Result Screen */
            <div className="text-center py-4">
              <div className="text-6xl mb-4">{resultLevel.emoji}</div>
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{content.resultTitle}</p>
              <h3
                className="font-serif-luxury text-4xl font-extrabold mb-2"
                style={{ color: resultLevel.color }}
              >
                {resultLevel.label}
              </h3>
              <p className="text-xs text-gray-400 mb-4">{content.resultSubtitle}</p>

              {/* Score Gauge */}
              <div className="mx-auto max-w-xs mb-6">
                <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
                  <span>0</span>
                  <span className="text-white font-bold">{normalizedScore}/100</span>
                  <span>100</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${normalizedScore}%`, backgroundColor: resultLevel.color }}
                  />
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-8 max-w-md mx-auto font-light">
                {resultLevel.desc}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleCta}
                  className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#c5a059] hover:bg-[#e5c07b] transition-colors shadow-lg shadow-[#c5a059]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {content.ctaBtn}
                </button>
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 rounded-xl text-xs font-semibold text-gray-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  {content.restartBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
