import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Skull, AlertTriangle, Terminal, Lock } from 'lucide-react';

const SuperAgeHacker = () => {
  const [showWarning, setShowWarning] = useState(true);
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [blink, setBlink] = useState(false);
  const [trollMessage, setTrollMessage] = useState('');
  const [fakeAlerts, setFakeAlerts] = useState([]);
  const [fakeIP, setFakeIP] = useState('');
  const [showFakeWarning, setShowFakeWarning] = useState(false);

  const logsEndRef = React.useRef(null);
  const alertTimeoutRef = React.useRef(null);

  // Toxic scripts - Random messages for each case
  const toxicScripts = {
    error: [
      "Nhập SỐ vào con lợn nhựa này! Mày thiểu năng à?",
      "Học hết lớp 1 chưa mà nhập chữ vào đây? Óc chó thực sự.",
      "Tao bảo nhập TUỔI! Mày đập đầu vào bàn phím à?",
      "Tay nhanh hơn não, reset lại cái đầu đất của mày đi.",
      "Mày thử nhập lại một lần nữa xem tao có đấm vào mồm mày không?"
    ],
    kid: [
      "Vắt mũi chưa sạch đòi làm hacker lỏ à con?",
      "Về bú tí mẹ đi rồi quay lại đây nói chuyện với chú.",
      "Tắt máy học bài đi không tao mách mẹ mày xem sẽ gầy đấy.",
      "Lông chưa mọc đủ thì đừng có đú đởn.",
      "Mày biết bảng cửu chương chưa mà đòi vào đây múa?"
    ],
    teen: [
      "Tuổi này không lo học, suốt ngày cắm mặt vào game thì bốc cứt thôi con ạ.",
      "Sĩ gái ít thôi, tiền nạp game còn xin mẹ thì gáy cái đ*o gì?",
      "Ảo tưởng sức mạnh vừa thôi, mày chỉ là hạt cát trong sa mạc thôi con.",
      "Nhìn mặt mày là thấy tương lai u ám vcl rồi.",
      "Đừng tưởng mình là nhân vật chính Anime, tỉnh lại đi thằng ngáo!"
    ],
    student: [
      "20 mấy tuổi đầu rồi mà vẫn nghèo rớt mồng tơi thế à?",
      "Người yêu đ*o có, chó cũng không nuôi, nhục vãi cả lúa.",
      "Suốt ngày than deadline với sếp hãm, sao đ*o dám nghỉ việc?",
      "Mặt thì uy tín đấy nhưng ví chắc toàn tiền lẻ với thẻ gửi xe.",
      "Bớt sống ảo lại, ra ngoài chạm cỏ (touch grass) đi con nghiện.",
      "Nhìn cái mặt mày là biết đang trốn nợ môn rồi."
    ],
    worker: [
      "Đau lưng mỏi gối tê bì chân tay chưa con già?",
      "Sắp 30 rồi, nhìn lại bản thân xem làm được cái mẹ gì cho đời chưa?",
      "Lương 3 cọc 3 đồng mà rảnh háng ngồi đây test web à?",
      "Ế chỏng ế chơ, chó nó còn chê mà cứ kén cá chọn canh.",
      "Cột sống bất ổn nhưng vẫn phải cày cuốc nuôi mồm, cay nhỉ?"
    ],
    old: [
      "Già rồi thì về bế cháu đi, lên mạng đú trend làm cái đ*o gì?",
      "Cẩn thận bấm nhầm link sex virus nó ăn hết tiền dưỡng già đấy.",
      "Mắt mờ chân chậm rồi, out trình đi cho lớp trẻ nó lên.",
      "Tầm này người ta đi du lịch, mình thì ngồi đây bấm linh tinh. Chán."
    ],
    special: [
      "Chưa đẻ đã biết dùng máy tính? Mày là quái thai à?",
      "Sống dai như đỉa đói thế? Diêm vương quên gạch tên mày à?",
      "69? Đầu óc mày chỉ chứa toàn nòng nọc thôi à? ( ͡° ͜ʖ ͡°)",
      "Nhập số to thế bố mày tính bằng niềm tin à? Cút!"
    ]
  };

  const getRandomMessage = (category) => {
    const messages = toxicScripts[category];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => setBlink(!blink), 500);
    return () => clearInterval(interval);
  }, [blink]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  useEffect(() => {
    if (loading) {
      setFakeIP(generateFakeIP());
      
      const alertInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomAlert = fakeAlertMessages[Math.floor(Math.random() * fakeAlertMessages.length)];
          const alertId = Date.now();
          setFakeAlerts(prev => [...prev, { id: alertId, message: randomAlert }]);
          
          setTimeout(() => {
            setFakeAlerts(prev => prev.filter(alert => alert.id !== alertId));
          }, 3000);
        }
      }, 2000);

      setTimeout(() => {
        setShowFakeWarning(true);
        setTimeout(() => setShowFakeWarning(false), 4000);
      }, 3000);

      return () => {
        clearInterval(alertInterval);
        if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
      };
    } else {
      setFakeAlerts([]);
      setShowFakeWarning(false);
    }
  }, [loading]);

  const fakeLogs = [
    "KHỞI ĐỘNG GIAO THỨC HACKERMAN...",
    "BYPASSING NSA FIREWALL...",
    "ĐANG XÂM NHẬP HỆ THỐNG NGÂN HÀNG...",
    "TẢI RAM TỪ DARK WEB...",
    "PHÂN TÍCH DNA TỪ BÀN PHÍM...",
    "ĐANG GHI LẠI MỌI PHÍM BẠN NHẤN...",
    "ĐÃ CHỤP MÀN HÌNH CỦA BẠN...",
    "ĐÃ TRUY CẬP CAMERA VÀ MICROPHONE...",
    "ĐANG ĐÀO BITCOIN BẰNG CPU CỦA BẠN...",
    "ĐÃ TẢI LỊCH SỬ DUYỆT WEB LÊN SERVER...",
    "ĐÃ SAO CHÉP CLIPBOARD CỦA BẠN...",
    "ĐÃ LẤY MẬT KHẨU TỪ TRÌNH DUYỆT...",
    "ĐÃ XÁC ĐỊNH VỊ TRÍ CỦA BẠN...",
    "ĐANG THEO DÕI CON TRỎ CHUỘT...",
    "GIẢI MÃ FILE MẬT CỦA CHÍNH PHỦ...",
    "TRUY CẬP DATABASE AREA 51...",
    "ĐANG HACK VÀO SERVER NASA...",
    "TẢI CẮP DỮ LIỆU CÁ NHÂN...",
    "BYPASSING ANTI-VIRUS...",
    "ĐANG XÓA LOG LỊCH SỬ...",
    "TẢI VIRUS TỪ TOR NETWORK...",
    "GIẢI MÃ MẬT KHẨU WIFI HÀNG XÓM...",
    "HACK VÀO TÀI KHOẢN FACEBOOK...",
    "HACK VÀO TÀI KHOẢN INSTAGRAM...",
    "HACK VÀO TÀI KHOẢN TIKTOK...",
    "TẢI CẮP CREDIT CARD INFO...",
    "BYPASSING TWO-FACTOR AUTHENTICATION...",
    "ĐANG XÓA BẰNG CHỨNG...",
    "TRUY CẬP DATABASE CỤC AN NINH...",
    "TẤT CẢ FILE CỦA BẠN ĐÃ BỊ MÃ HÓA...",
    "ĐANG GỬI DỮ LIỆU ĐẾN SERVER NGA...",
    "FBI ĐÃ ĐƯỢC THÔNG BÁO...",
    "TÍNH TOÁN ĐẾN SỐ THẬP PHÂN CUỐI CÙNG...",
    "ĐANG HỎI CHAT-GPT 1...",
    "COMPILING STUPIDITY METRICS...",
    "ERROR: NGƯỜI DÙNG QUÁ COOL. RETRYING...",
    "HOÀN TẤT DATA PACKETS..."
  ];

  const fakeAlertMessages = [
    "⚠️ CẢNH BÁO: VIRUS ĐÃ ĐƯỢC PHÁT HIỆN!",
    "🚨 FBI ĐANG THEO DÕI BẠN!",
    "💀 TẤT CẢ FILE CỦA BẠN SẼ BỊ XÓA SAU 10 GIÂY!",
    "🔥 HỆ THỐNG ĐANG BỊ TẤN CÔNG!",
    "⚡ ĐÃ PHÁT HIỆN HOẠT ĐỘNG ĐÁNG NGỜ!",
    "🎯 IP CỦA BẠN ĐÃ BỊ TRUY VẾT!",
    "💣 BOM LOGIC ĐÃ ĐƯỢC KÍCH HOẠT!",
    "🌐 ĐANG KẾT NỐI ĐẾN DARK WEB...",
    "🔐 MẬT KHẨU CỦA BẠN ĐÃ BỊ LỘ!",
    "📸 CAMERA CỦA BẠN ĐANG BẬT!",
    "🎤 MICROPHONE ĐANG GHI ÂM!",
    "💰 TÀI KHOẢN NGÂN HÀNG CỦA BẠN ĐÃ BỊ TRỐNG!",
    "📱 TẤT CẢ ẢNH TRONG ĐIỆN THOẠI ĐÃ BỊ TẢI LÊN!",
    "🖥️ MÀN HÌNH CỦA BẠN ĐANG ĐƯỢC QUAY LẠI!",
    "🌍 VỊ TRÍ CỦA BẠN: 10.123.45.67 - HÀ NỘI, VIỆT NAM"
  ];

  const generateFakeIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  const handleCalculate = () => {
    if (!age || age.trim() === '') {
      alert("NICE TRY, FBI. NHẬP TUỔI VÀO ĐI!");
      return;
    }

    const numAge = parseInt(age);
    const isNaN = isNaN(numAge);
    
    // Check for special cases first
    if (isNaN) {
      // Nhập chữ - show error message
      setTrollMessage(getRandomMessage('error'));
      setResult(null);
      setLoading(false);
      return;
    }

    if (numAge < 0) {
      setTrollMessage(getRandomMessage('special'));
      setResult(null);
      setLoading(false);
      return;
    }

    if (numAge === 69) {
      setTrollMessage(getRandomMessage('special'));
      setResult(null);
      setLoading(false);
      return;
    }

    if (numAge > 100) {
      setTrollMessage(getRandomMessage('special'));
      setResult(null);
      setLoading(false);
      return;
    }

    // Start loading process
    setLoading(true);
    setLogs([]);
    setResult(null);
    setTrollMessage('');

    let index = 0;
    const interval = setInterval(() => {
      if (index < fakeLogs.length) {
        setLogs(prev => [...prev, fakeLogs[index]]);
        index++;
      } else {
        clearInterval(interval);
        finishHack(numAge);
      }
    }, 350);
  };

  const finishHack = (ageNum) => {
    setLoading(false);
    
    // Confetti explosion
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    setResult(`XÁC NHẬN: BẠN ${ageNum} TUỔI`);

    // Get toxic message based on age
    if (ageNum < 10) {
      setTrollMessage(getRandomMessage('kid'));
    } else if (ageNum >= 10 && ageNum < 18) {
      setTrollMessage(getRandomMessage('teen'));
    } else if (ageNum >= 18 && ageNum <= 25) {
      setTrollMessage(getRandomMessage('student'));
    } else if (ageNum >= 26 && ageNum <= 40) {
      setTrollMessage(getRandomMessage('worker'));
    } else {
      setTrollMessage(getRandomMessage('old'));
    }
  };

  // Warning modal: First load, scare them with epilepsy warning. Brutalist style.
  if (showWarning) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-red-600 text-white p-8 border-4 border-yellow-400 rounded-none shadow-[0_0_0_10px_#ff0000]">
          <h2 className="text-2xl font-bold mb-4" style={{fontFamily: 'Comic Sans MS'}}>EPILEPSY WARNING!!!</h2>
          <p className="mb-4" style={{fontFamily: 'Courier New'}}>This site contains flashing lights and may cause seizures. Proceed at your own risk!</p>
          <button onClick={() => setShowWarning(false)} className="bg-green-500 text-black px-4 py-2 border-2 border-black font-bold" style={{fontFamily: 'Comic Sans MS'}}>I ACCEPT THE RISK</button>
        </div>
      </div>
    );
  }

  // Main component: Brutalist layout with strobe background, marquee, input, button, loading, result.
  return (
    <div className="min-h-screen bg-black text-white p-4" style={{background: 'linear-gradient(45deg, #000, #ff00ff, #00ff00, #ff0000)', backgroundSize: '400% 400%', animation: 'strobe 1s infinite'}}>
      <style>{`
        @keyframes strobe {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .shake { animation: shake 0.5s infinite; }
        .blink { opacity: ${blink ? 1 : 0}; }
        .marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
      <div className="marquee bg-pink-500 text-black p-2 font-bold text-xl overflow-hidden whitespace-nowrap" style={{fontFamily: 'Comic Sans MS'}}>
        xX_Super_Age_Hacker_Xx - The Ultimate Quantum Age Calculator - Warning: May Cause Existential Crisis
      </div>
      <div className="max-w-md mx-auto mt-8">
        <h1 className="text-4xl font-bold text-center mb-8 shake" style={{fontFamily: 'Courier New', color: '#00ff00'}}>xX_Super_Age_Hacker_Xx</h1>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age, mortal..."
          className="w-full p-4 text-2xl bg-black border-4 border-lime-400 text-lime-400 font-mono"
        />
        <button
          onClick={handleCalculate}
          disabled={loading || !age}
          className="w-full mt-4 p-4 bg-red-600 text-white border-4 border-yellow-400 font-bold text-xl hover:shake"
          style={{fontFamily: 'Comic Sans MS'}}
        >
          INITIATE HACK
        </button>
        {loading && (
          <div className="mt-8 p-4 bg-black border-4 border-pink-500 text-pink-500 font-mono">
            <h2 className="text-xl mb-4">Hacking in progress...</h2>
            <div className="h-32 overflow-y-auto">
              {logs.map((log, i) => <p key={i}>{log}</p>)}
            </div>
          </div>
        )}
        {result && (
          <div className="mt-8 p-8 bg-red-600 text-white border-4 border-black text-center blink">
            <h2 className="text-2xl mb-4" style={{fontFamily: 'Courier New'}}>ACCORDING TO MY CALCULATIONS, YOU ARE...</h2>
            <p className="text-6xl font-bold mb-4" style={{fontFamily: 'Comic Sans MS'}}>{result}</p>
            <p className="text-lg">{getComment(result)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAgeHacker;