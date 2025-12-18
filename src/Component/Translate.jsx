// import React, { useEffect, useState, useCallback } from "react";
// import { Globe, ArrowRight, Loader2, Languages } from "lucide-react";

// export default function Translate() {
//   const [inputText, setInputText] = useState("");
//   const [translatedText, setTranslatedText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [targetLanguage, setTargetLanguage] = useState("hi-IN");
//   const [posts, setPosts] = useState([]);
//   const [originalPosts, setOriginalPosts] = useState([]);
//   const [translatingPosts, setTranslatingPosts] = useState(false);
//   const API_KEY = "sk_z0fygwav_Br2EQYf6L5UWPOZbZXV7xpxl";

//   const languages = [
//     { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
//     { code: "en-IN", name: "English", flag: "🇬🇧" },
//     { code: "pa-IN", name: "Punjabi", flag: "🇮🇳" },
//   ];

//   const dummyTexts = {
//     "hi-IN":
//       "नमस्ते! यह एक डेमो टेक्स्ट है। सरवम एआई का उपयोग करके हम विभिन्न भाषाओं में अनुवाद कर सकते हैं।",
//     "en-IN":
//       "Hello! This is a demo text. Using Sarvam AI, we can translate into different languages.",
//     "pa-IN":
//       "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਇਹ ਇੱਕ ਡੈਮੋ ਟੈਕਸਟ ਹੈ। ਸਰਵਮ ਏਆਈ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਸੀਂ ਵੱਖ-ਵੱਖ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਅਨੁਵਾਦ ਕਰ ਸਕਦੇ ਹਾਂ।",
//   };

//   const handleLanguageChange = (langCode) => {
//     setTargetLanguage(langCode);
//     setError("");
//   };

//   // Translate single text
//   const translateApiText = async (text, langCode) => {
//     try {
//       // If target language is English, return original text
//       if (langCode === "en-IN") {
//         return text;
//       }

//       const response = await fetch("https://api.sarvam.ai/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "api-subscription-key": API_KEY,
//         },
//         body: JSON.stringify({
//           input: text,
//           source_language_code: "en-IN",
//           target_language_code: langCode,
//           speaker_gender: "Male",
//           mode: "formal",
//           model: "mayura:v1",
//           enable_preprocessing: true,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.translated_text || text;
//     } catch (err) {
//       console.error("Translation error:", err);
//       return text; // Return original text on error
//     }
//   };

//   // Translate all posts
//   const translatePosts = useCallback(
//     async (langCode) => {
//       if (originalPosts.length === 0) return;

//       setTranslatingPosts(true);
//       try {
//         const translated = await Promise.all(
//           originalPosts.map(async (post) => {
//             const translatedTitle = await translateApiText(
//               post.title,
//               langCode
//             );
//             return { ...post, translatedTitle };
//           })
//         );
//         setPosts(translated);
//       } catch (err) {
//         console.error("Error translating posts:", err);
//       } finally {
//         setTranslatingPosts(false);
//       }
//     },
//     [originalPosts]
//   );

//   const translateText = async () => {
//     if (!inputText.trim()) {
//       setError("Please enter some text to translate");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setTranslatedText("");

//     try {
//       const response = await fetch("https://api.sarvam.ai/translate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "api-subscription-key": API_KEY,
//         },
//         body: JSON.stringify({
//           input: inputText,
//           source_language_code: "en-IN",
//           target_language_code: targetLanguage,
//           speaker_gender: "Male",
//           mode: "formal",
//           model: "mayura:v1",
//           enable_preprocessing: true,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`API Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       setTranslatedText(data.translated_text || "Translation not available");
//     } catch (err) {
//       setError(err.message || "Failed to translate text");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data only once on mount
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//         const data = await res.json();
//         const limited = data.slice(0, 10); // Limit to 10 posts
//         setOriginalPosts(limited);
//         // Translate immediately after fetching with current language
//         await translatePosts(targetLanguage);
//       } catch (err) {
//         console.error("Error fetching posts:", err);
//       }
//     };
//     getData();
//   }, []);

//   // Translate posts when language changes
//   useEffect(() => {
//     if (originalPosts.length > 0) {
//       translatePosts(targetLanguage);
//     }
//   }, [targetLanguage, originalPosts.length, translatePosts]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center gap-2 mb-2">
//             <Globe className="w-8 h-8 text-purple-600" />
//             <h1 className="text-3xl font-bold text-gray-800">
//               Multi-Language Translator
//             </h1>
//           </div>
//           <p className="text-gray-600">
//             Translate between Hindi, English & Punjabi
//           </p>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex items-center gap-3 mb-4">
//             <Languages className="w-5 h-5 text-purple-600" />
//             <label className="block text-sm font-medium text-gray-700">
//               Select Target Language
//             </label>
//           </div>
//           <div className="grid grid-cols-3 gap-4">
//             {languages.map((lang) => (
//               <button
//                 key={lang.code}
//                 onClick={() => handleLanguageChange(lang.code)}
//                 className={`p-4 rounded-lg border-2 transition-all ${
//                   targetLanguage === lang.code
//                     ? "border-purple-600 bg-purple-50 shadow-md"
//                     : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="text-3xl mb-2">{lang.flag}</div>
//                 <div className="font-semibold text-gray-800">{lang.name}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Demo Text Preview (
//             {languages.find((l) => l.code === targetLanguage)?.name})
//           </label>
//           <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
//             <p className="text-lg text-gray-800 leading-relaxed">
//               {dummyTexts[targetLanguage]}
//             </p>
//           </div>
//           <p className="text-xs text-gray-500 mt-2">
//             This text changes automatically when you select a different language
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Enter Your Text
//             </label>
//             <textarea
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//               placeholder="Type your text here..."
//               className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
//             />
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Translation (
//               {languages.find((l) => l.code === targetLanguage)?.name})
//             </label>
//             <div className="w-full h-40 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 overflow-y-auto">
//               {loading ? (
//                 <div className="flex items-center justify-center h-full">
//                   <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
//                 </div>
//               ) : translatedText ? (
//                 <p className="text-gray-800 text-lg leading-relaxed">
//                   {translatedText}
//                 </p>
//               ) : (
//                 <p className="text-gray-400">Translation will appear here...</p>
//               )}
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <p className="text-red-700">{error}</p>
//           </div>
//         )}

//         <div className="text-center">
//           <button
//             onClick={translateText}
//             disabled={loading}
//             className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-5 h-5 animate-spin" />
//                 Translating...
//               </>
//             ) : (
//               <>
//                 Translate
//                 <ArrowRight className="w-5 h-5" />
//               </>
//             )}
//           </button>
//         </div>
//         {/* API Posts List */}
//         <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800">
//               API Posts (
//               {languages.find((l) => l.code === targetLanguage)?.name})
//             </h2>
//             {translatingPosts && (
//               <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
//             )}
//           </div>
//           <div className="space-y-3">
//             {posts.length > 0 ? (
//               posts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
//                 >
//                   <h4 className="text-gray-800 font-medium leading-relaxed">
//                     {post.translatedTitle || post.title}
//                   </h4>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400 text-center py-4">Loading posts...</p>
//             )}
//           </div>
//         </div>
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>Powered by Sarvam AI</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Globe, ArrowRight, Loader2, Languages } from "lucide-react";

/**
 * Multi-Language Translator (Full Component)
 *
 * - Bulk-translates posts with a single API call (input: array of strings)
 * - Translates single user input text
 * - Uses AbortController to cancel stale fetches
 * - Shows loading states & error handling
 *
 * NOTES:
 * - Put your API key into an env variable like REACT_APP_SARVAM_KEY
 *   and access with process.env.REACT_APP_SARVAM_KEY
 * - Sarvam translate endpoint expects "input" to be an array for bulk,
 *   but also accepts a single string. The response can be string or array,
 *   so the code normalizes both cases.
 */

export default function Translate() {
  // UI state
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Language & posts state
  const [targetLanguage, setTargetLanguage] = useState("hi-IN");
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [translatingPosts, setTranslatingPosts] = useState(false);

  // API key (recommended to store in env)
  const API_KEY = "sk_z0fygwav_Br2EQYf6L5UWPOZbZXV7xpxl";

  const languages = [
    { code: "hi-IN", name: "Hindi", flag: "🇮🇳" },
    { code: "en-IN", name: "English", flag: "🇬🇧" },
    { code: "pa-IN", name: "Punjabi", flag: "🇮🇳" },
  ];

  const dummyTexts = {
    "hi-IN":
      "नमस्ते! यह एक डेमो टेक्स्ट है। सरवम एआई का उपयोग करके हम विभिन्न भाषाओं में अनुवाद कर सकते हैं।",
    "en-IN":
      "Hello! This is a demo text. Using Sarvam AI, we can translate into different languages.",
    "pa-IN":
      "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਇਹ ਇੱਕ ਡੈਮੋ ਟੈਕਸਟ ਹੈ। ਸਰਵਮ ਏਆਈ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਅਸੀਂ ਵੱਖ-ਵੱਖ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਅਨੁਵਾਦ ਕਰ ਸਕਦੇ ਹਾਂ।",
  };

  // Keep refs for AbortControllers to cancel previous translation requests
  const postsTranslateControllerRef = useRef(null);
  const singleTranslateControllerRef = useRef(null);
  const fetchPostsControllerRef = useRef(null);

  const handleLanguageChange = (langCode) => {
    setTargetLanguage(langCode);
    setError("");
  };

  // Utility: call sarvam translate endpoint
  // Accepts `inputPayload` which can be string or array of strings.
  const callTranslateApi = async (inputPayload, langCode, abortSignal) => {
    // If target is English, return original or array unchanged
    if (langCode === "en-IN") {
      return inputPayload;
    }

    // Build body - input can be array or single string
    const body = {
      input: inputPayload,
      source_language_code: "en-IN",
      target_language_code: langCode,
      speaker_gender: "Male",
      mode: "formal",
      model: "mayura:v1",
      enable_preprocessing: true,
    };

    const res = await fetch("https://api.sarvam.ai/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": API_KEY,
      },
      body: JSON.stringify(body),
      signal: abortSignal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API Error ${res.status}: ${text || res.statusText}`);
    }

    const data = await res.json();

    // Normalize response:
    // - For single input, API might return string
    // - For array input, API returns array
    // We return exactly what the UI expects:
    // - For string input -> string
    // - For array input -> array
    return data.translated_text ?? inputPayload;
  };

  // Bulk translate posts using one API call
  const translatePosts = useCallback(
    async (langCode) => {
      if (originalPosts.length === 0) {
        setPosts([]);
        return;
      }

      // Cancel previous posts translation
      if (postsTranslateControllerRef.current) {
        postsTranslateControllerRef.current.abort();
      }
      const controller = new AbortController();
      postsTranslateControllerRef.current = controller;

      setTranslatingPosts(true);
      setError("");

      try {
        // Prepare array of titles
        const titles = originalPosts.map((p) => p.title || "");

        // If language is English, skip API call and map directly
        if (langCode === "en-IN") {
          const mapped = originalPosts.map((p) => ({
            ...p,
            translatedTitle: p.title,
          }));
          setPosts(mapped);
          return;
        }

        // Single API call for all titles
        const translated = await callTranslateApi(
          titles,
          langCode,
          controller.signal
        );

        // translated should be an array; if not, fallback
        const translatedArray = Array.isArray(translated) ? translated : titles;

        const merged = originalPosts.map((post, idx) => ({
          ...post,
          translatedTitle: translatedArray[idx] ?? post.title,
        }));

        setPosts(merged);
      } catch (err) {
        if (err.name === "AbortError") {
          // ignore abort
        } else {
          console.error("Error translating posts:", err);
          setError("Failed to translate posts.");
        }
      } finally {
        setTranslatingPosts(false);
      }
    },
    [originalPosts, API_KEY]
  );

  // Translate single user input text
  const translateText = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text to translate");
      return;
    }

    // Cancel previous single translation
    if (singleTranslateControllerRef.current) {
      singleTranslateControllerRef.current.abort();
    }
    const controller = new AbortController();
    singleTranslateControllerRef.current = controller;

    setLoading(true);
    setError("");
    setTranslatedText("");

    try {
      // If English -> no API call
      if (targetLanguage === "en-IN") {
        setTranslatedText(inputText);
        return;
      }

      const result = await callTranslateApi(
        inputText,
        targetLanguage,
        controller.signal
      );
      // result might be string or array; normalize to string
      const translated = Array.isArray(result)
        ? result[0] ?? inputText
        : result ?? inputText;
      setTranslatedText(translated);
    } catch (err) {
      if (err.name === "AbortError") {
        // aborted - ignore
      } else {
        console.error("Translate single error:", err);
        setError(err.message || "Failed to translate text");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts once (on mount)
  useEffect(() => {
    const controller = new AbortController();
    fetchPostsControllerRef.current = controller;

    const getData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        const limited = data.slice(0, 10); // keep 10
        setOriginalPosts(limited);
        // Translate immediately with current language
        // Don't await here to avoid blocking UI; call translatePosts after setting posts
      } catch (err) {
        if (err.name === "AbortError") {
          // ignored
        } else {
          console.error("Error fetching posts:", err);
          setError("Failed to fetch posts");
        }
      }`0`
    };

    getData();

    return () => {
      controller.abort();
    };
  }, []);

  // Translate when language or originalPosts changes
  useEffect(() => {
    if (originalPosts.length > 0) {
      translatePosts(targetLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetLanguage, originalPosts.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Globe className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Multi-Language Translator
            </h1>
          </div>
          <p className="text-gray-600">
            Translate between Hindi, English & Punjabi
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Languages className="w-5 h-5 text-purple-600" />
            <label className="block text-sm font-medium text-gray-700">
              Select Target Language
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  targetLanguage === lang.code
                    ? "border-purple-600 bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }`}
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <div className="font-semibold text-gray-800">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demo Text Preview (
            {languages.find((l) => l.code === targetLanguage)?.name})
          </label>
          <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <p className="text-lg text-gray-800 leading-relaxed">
              {dummyTexts[targetLanguage]}
            </p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            This text changes automatically when you select a different language
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your text here..."
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Translation (
              {languages.find((l) => l.code === targetLanguage)?.name})
            </label>
            <div className="w-full h-40 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                </div>
              ) : translatedText ? (
                <p className="text-gray-800 text-lg leading-relaxed">
                  {translatedText}
                </p>
              ) : (
                <p className="text-gray-400">Translation will appear here...</p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={translateText}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                Translate
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* API Posts List */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              API Posts (
              {languages.find((l) => l.code === targetLanguage)?.name})
            </h2>
            {translatingPosts && (
              <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
            )}
          </div>

          <div className="space-y-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200"
                >
                  <h4 className="text-gray-800 font-medium leading-relaxed">
                    {post.translatedTitle || post.title}
                  </h4>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-4">Loading posts...</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Sarvam AI</p>
        </div>
      </div>
    </div>
  );
}
