"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trash2, StickyNote, Lightbulb } from "lucide-react";

export default function DashboardWidgets() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState("");
  const [emoji, setEmoji] = useState(null);

  const emojis = ["😍", "😐", "😴", "🙃"];

  const factsPool = [
    "Did you know? The Eiffel Tower can be 15 cm taller during hot days.",
    "Octopuses have three hearts!",
    "Bananas are berries, but strawberries aren't.",
    "Honey never spoils — archaeologists found edible honey in 3000-year-old tombs."
  ];

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("dashboard_notes")) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * factsPool.length);
    setFact(factsPool[randomIndex]);
  }, []);

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, { text: noteInput, done: false }]);
      setNoteInput("");
    }
  };

  const toggleDone = (index) => {
    const updated = [...notes];
    updated[index].done = !updated[index].done;
    setNotes(updated);
  };

  const deleteNote = (index) => {
    const updated = notes.filter((_, i) => i !== index);
    setNotes(updated);
  };

  return (
    <>
      {/* Notes Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          <StickyNote className="w-6 h-6" />
        </button>
      </div>

      {/* Fact Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setShowFact(!showFact)}
          className="bg-yellow-300 text-black p-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          <Lightbulb className="w-6 h-6" />
        </button>
      </div>

      {/* Notes Modal */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-20 right-6 w-80 max-h-[80vh] bg-white shadow-2xl rounded-xl p-4 overflow-y-auto z-50"
          >
            <h3 className="text-lg font-semibold mb-2">📝 My Notes</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                className="border flex-1 rounded px-2 py-1"
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Add a note"
              />
              <button
                onClick={addNote}
                className="bg-primary text-white px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
            <ul className="space-y-2">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 rounded p-2"
                >
                  <span
                    className={`flex-1 ${note.done ? "line-through text-gray-500" : ""}`}
                  >
                    {note.text}
                  </span>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => toggleDone(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteNote(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fact Popup */}
      <AnimatePresence>
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-6 w-80 bg-yellow-100 text-black p-4 rounded-xl shadow-xl z-50"
          >
            <h3 className="font-semibold text-md mb-2">📘 Fact of the Day</h3>
            <p className="mb-4">{fact}</p>
            <div className="flex gap-2">
              {emojis.map((e, i) => (
                <button
                  key={i}
                  onClick={() => setEmoji(e)}
                  className={`text-xl transition transform hover:scale-125 ${
                    emoji === e ? "scale-125" : ""
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
            {emoji && <p className="mt-2 text-sm">You reacted: {emoji}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
