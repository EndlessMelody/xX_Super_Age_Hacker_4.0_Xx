import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Skull, AlertTriangle, Terminal, Lock } from 'lucide-react';
import mainIcon from './assets/main-icon.jpg';

const SmartAgeCalculator = () => {
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
  const [annoyingPopups, setAnnoyingPopups] = useState([]);
  const [cursorTrails, setCursorTrails] = useState([]);
  const [fakeCursors, setFakeCursors] = useState([]);
  const [screenShake, setScreenShake] = useState(false);
  const [fakeDownloads, setFakeDownloads] = useState([]);
  const [fakeTyping, setFakeTyping] = useState('');
  const [glitchText, setGlitchText] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [floatingBackgroundImages, setFloatingBackgroundImages] = useState([]);

  const logsEndRef = React.useRef(null);
  const containerRef = React.useRef(null);

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

  // Load background images from folder
  useEffect(() => {
    // Use Vite's import.meta.glob to dynamically import all JPG images
    const imageModules = import.meta.glob('/src/assets/background-images/*.jpg', { eager: true });
    const images = Object.values(imageModules).map(module => module.default);
    setBackgroundImages(images);
  }, []);

  // Create floating background images
  useEffect(() => {
    if (showWarning || backgroundImages.length === 0) return;

    // Create initial floating images
    const createFloatingImage = () => {
      if (backgroundImages.length === 0) return null;

      const imageId = Date.now() + Math.random();
      const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

      return {
        id: imageId,
        src: randomImage,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5, // Slow movement
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        scale: 0.3 + Math.random() * 0.4, // 0.3 to 0.7 scale
        opacity: 0.1 + Math.random() * 0.15 // 0.1 to 0.25 opacity (mờ)
      };
    };

    // Add initial images
    const initialImages = Array.from({ length: 5 }, () => createFloatingImage()).filter(Boolean);
    setFloatingBackgroundImages(initialImages);

    // Add new images periodically
    const addImageInterval = setInterval(() => {
      if (Math.random() > 0.7 && floatingBackgroundImages.length < 10) {
        const newImage = createFloatingImage();
        if (newImage) {
          setFloatingBackgroundImages(prev => [...prev, newImage]);
        }
      }
    }, 3000);

    // Move images
    const moveInterval = setInterval(() => {
      setFloatingBackgroundImages(prev => prev.map(img => ({
        ...img,
        x: img.x + img.vx,
        y: img.y + img.vy,
        rotation: img.rotation + img.rotationSpeed,
        // Bounce off edges
        vx: img.x <= -100 || img.x >= window.innerWidth + 100 ? -img.vx : img.vx,
        vy: img.y <= -100 || img.y >= window.innerHeight + 100 ? -img.vy : img.vy
      })));
    }, 50);

    // Remove old images and add new ones
    const cleanupInterval = setInterval(() => {
      setFloatingBackgroundImages(prev => {
        // Remove images that are too far off screen
        const filtered = prev.filter(img =>
          img.x > -200 && img.x < window.innerWidth + 200 &&
          img.y > -200 && img.y < window.innerHeight + 200
        );

        // Add new image if needed
        if (filtered.length < 8 && Math.random() > 0.5) {
          const newImage = createFloatingImage();
          if (newImage) {
            return [...filtered, newImage];
          }
        }

        return filtered;
      });
    }, 5000);

    return () => {
      clearInterval(addImageInterval);
      clearInterval(moveInterval);
      clearInterval(cleanupInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWarning, backgroundImages.length]);

  useEffect(() => {
    const interval = setInterval(() => setBlink(!blink), 500);
    return () => clearInterval(interval);
  }, [blink]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [logs]);

  // Track mouse movement for cursor trails
  useEffect(() => {
    if (showWarning) return;

    const handleMouseMove = (e) => {
      const trailId = Date.now() + Math.random();
      setCursorTrails(prev => [...prev, {
        id: trailId,
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      }]);

      // Remove trail after animation
      setTimeout(() => {
        setCursorTrails(prev => prev.filter(trail => trail.id !== trailId));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showWarning]);

  // Generate fake cursors
  useEffect(() => {
    if (showWarning) return;

    const cursorInterval = setInterval(() => {
      const cursorId = Date.now() + Math.random();
      setFakeCursors(prev => [...prev, {
        id: cursorId,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      }]);

      setTimeout(() => {
        setFakeCursors(prev => prev.filter(cursor => cursor.id !== cursorId));
      }, 5000);
    }, 2000);

    return () => clearInterval(cursorInterval);
  }, [showWarning]);

  // Move fake cursors
  useEffect(() => {
    if (showWarning || fakeCursors.length === 0) return;

    const moveInterval = setInterval(() => {
      setFakeCursors(prev => prev.map(cursor => ({
        ...cursor,
        x: Math.max(0, Math.min(window.innerWidth, cursor.x + cursor.vx)),
        y: Math.max(0, Math.min(window.innerHeight, cursor.y + cursor.vy)),
        vx: (cursor.x <= 0 || cursor.x >= window.innerWidth) ? -cursor.vx : cursor.vx,
        vy: (cursor.y <= 0 || cursor.y >= window.innerHeight) ? -cursor.vy : cursor.vy
      })));
    }, 50);

    return () => clearInterval(moveInterval);
  }, [showWarning, fakeCursors.length]);

  // Screen shake effect
  useEffect(() => {
    if (showWarning) return;

    const shakeInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setScreenShake(true);
        setTimeout(() => setScreenShake(false), 200);
      }
    }, 3000);

    return () => clearInterval(shakeInterval);
  }, [showWarning]);

  // Fake download bars
  useEffect(() => {
    if (showWarning) return;

    const downloadInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const downloadId = Date.now() + Math.random();
        setFakeDownloads(prev => [...prev, {
          id: downloadId,
          progress: 0,
          filename: `virus_${Math.floor(Math.random() * 1000)}.exe`
        }]);

        const progressInterval = setInterval(() => {
          setFakeDownloads(prev => prev.map(dl =>
            dl.id === downloadId
              ? { ...dl, progress: Math.min(100, dl.progress + Math.random() * 10) }
              : dl
          ));
        }, 200);

        setTimeout(() => {
          clearInterval(progressInterval);
          setFakeDownloads(prev => prev.filter(dl => dl.id !== downloadId));
        }, 5000);
      }
    }, 4000);

    return () => clearInterval(downloadInterval);
  }, [showWarning]);

  // Fake typing indicator
  useEffect(() => {
    if (showWarning) return;

    const typingMessages = [
      "Đang gõ...",
      "Đang nhập...",
      "Đang hack...",
      "Đang lấy dữ liệu...",
      "Đang xâm nhập..."
    ];

    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const message = typingMessages[Math.floor(Math.random() * typingMessages.length)];
        setFakeTyping(message);
        setTimeout(() => setFakeTyping(''), 2000);
      }
    }, 3000);

    return () => clearInterval(typingInterval);
  }, [showWarning]);

  // Glitch text effect
  useEffect(() => {
    if (showWarning) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 300);
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, [showWarning]);

  // Floating icons effect - using background images
  useEffect(() => {
    if (showWarning || backgroundImages.length === 0) return;

    const iconInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const iconId = Date.now() + Math.random();
        const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

        setFloatingIcons(prev => [...prev, {
          id: iconId,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 0.5,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          rotationSpeed: (Math.random() - 0.5) * 5,
          src: randomImage
        }]);

        setTimeout(() => {
          setFloatingIcons(prev => prev.filter(icon => icon.id !== iconId));
        }, 8000);
      }
    }, 1500);

    return () => clearInterval(iconInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWarning, backgroundImages.length]);

  // Move floating icons
  useEffect(() => {
    if (showWarning || floatingIcons.length === 0) return;

    const moveInterval = setInterval(() => {
      setFloatingIcons(prev => prev.map(icon => ({
        ...icon,
        x: icon.x + icon.vx,
        y: icon.y + icon.vy,
        rotation: icon.rotation + icon.rotationSpeed,
        vx: icon.x <= 0 || icon.x >= window.innerWidth ? -icon.vx : icon.vx,
        vy: icon.y <= 0 || icon.y >= window.innerHeight ? -icon.vy : icon.vy
      })));
    }, 50);

    return () => clearInterval(moveInterval);
  }, [showWarning, floatingIcons.length]);

  // Generate annoying popups continuously
  useEffect(() => {
    if (showWarning) return; // Don't show popups during warning

    const popupInterval = setInterval(() => {
      if (Math.random() > 0.2) { // 80% chance to spawn popup - more annoying!
        const message = annoyingMessages[Math.floor(Math.random() * annoyingMessages.length)];
        const popupId = Date.now() + Math.random();
        const left = Math.random() * 75 + 5; // 5% to 80% of screen width
        const top = Math.random() * 75 + 5; // 5% to 80% of screen height
        const rotation = (Math.random() - 0.5) * 45; // -22.5 to 22.5 degrees

        setAnnoyingPopups(prev => [...prev, {
          id: popupId,
          message,
          left,
          top,
          rotation,
          opacity: 1
        }]);

        // Remove popup after 2-4 seconds
        setTimeout(() => {
          setAnnoyingPopups(prev => prev.map(popup =>
            popup.id === popupId ? { ...popup, opacity: 0 } : popup
          ));
          setTimeout(() => {
            setAnnoyingPopups(prev => prev.filter(popup => popup.id !== popupId));
          }, 500);
        }, 2000 + Math.random() * 2000);
      }
    }, 600); // Spawn popup every 0.6 seconds - faster!

    return () => clearInterval(popupInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showWarning]);

  useEffect(() => {
    if (loading) {
      setFakeIP(generateFakeIP());

      const alertInterval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomAlert = fakeAlertMessages[Math.floor(Math.random() * fakeAlertMessages.length)];
          const alertId = Date.now() + Math.random();
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
      };
    } else {
      setFakeAlerts([]);
      setShowFakeWarning(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const fakeLogs = [
    "Từ từ, mạng nhà bạn lag vãi chưởng...",
    "Ây da, đoạn code này ai viết mà ngu thế nhỉ... à là mình.",
    "Đang thử mò pass wifi nhà hàng xóm... 12345678 không được à?",
    "Ê khoan, hình như bạn chưa xóa lịch sử duyệt web kìa? Toang!",
    "Đợi tí nhé, đang order ly trà sữa đã, khát quá.",
    "Alo alo, tổng đài Anime xin nghe... nhầm số rồi bạn ơi.",
    "Đang tính tuổi... nhưng mà nhìn mặt bạn uy tín thế này chắc 2k5 hả?",
    "Chạy ngầm tí đào coin nhé, máy bạn khỏe mà lo gì.",
    "Ước gì được Isekai sang thế giới khác chứ ngồi code mệt vãi...",
    "Đang lục lọi folder 'Tài Liệu Học Tập'... ủa sao toàn video MP4 thế này?",
    "Hack vệ tinh NASA... thôi đùa đấy, hack cái máy tính casio thôi.",
    "Check var xem bạn có phải Wibu không... Á dù, nồng nặc mùi!",
    "Đang gọi Doraemon... Alo, cho mượn cỗ máy thời gian check tuổi cái.",
    "Mạng mẽo chán đời thế, quay đều quay đều...",
    "Đang tải RAM về... ủa quên, RAM làm sao mà tải được nhỉ?",
    "Suỵt! Bé mồm thôi, mẹ bạn đang đi vào phòng kìa!",
    "Đang scan khuôn mặt... hmm, giao diện này hơi khó ưa nha.",
    "Cầu trời khấn phật cho code không bị bug...",
    "Đang bật mode 'Nghiêm túc'... đùa thôi, làm gì có mode đấy.",
    "Loading... Loading... Chờ tí làm gì mà căng?",
    "Đang hỏi Chat GPT xem bạn bao nhiêu tuổi... nó bảo không biết.",
    "Đang bận xem nốt tập One Piece, chờ 5 phút nhé.",
    "Kích hoạt tường lửa... à nhầm, kích hoạt tường thạch cao.",
    "Đang spam nút F5... máy bạn sắp bốc khói chưa?",
    "Tìm kiếm người yêu cho bạn... Kết quả: 404 Not Found (Cay!)",
    "Đang múa Yone 0/10/0 trong server máy bạn...",
    "Xong chưa nhỉ? Chưa xong, đợi thêm tí đi.",
    "Đang lấy vân tay qua màn hình cảm ứng... đùa đấy, tin người vcl."
  ];

  const fakeAlertMessages = [
    "Ê Ê! Bấm nhẹ thôi hỏng chuột bây giờ!",
    "Cảnh báo: Phát hiện độ đẹp trai/xinh gái bằng 0!",
    "Alo? Cảnh sát chính tả đây, bạn vừa gõ sai đúng không?",
    "Toang rồi ông giáo ạ! Lộ hết bí mật rồi!",
    "Waifu của bạn không có thật đâu, tỉnh lại đi bạn ơi!",
    "Máy này sắp tự hủy trong 3... 2... 1... BÙM! (Đùa đấy)",
    "Phát hiện mùi 'Simp chúa' quanh đây! Là bạn đúng không?",
    "Nạp lần đầu đi bạn, web này hút máu lắm!",
    "Cẩn thận! Mẹ bạn đang đứng sau lưng kìa (Check map đi)!",
    "Đừng nhìn tôi bằng ánh mắt đấy, ngại quá >///<",
    "Bạn có chắc là muốn biết sự thật không? Đau lòng lắm đấy.",
    "Đang xem cái gì đấy? Tắt tab ẩn danh đi nhanh lên!",
    "Bankai!!! À quên, nhầm kịch bản.",
    "Có làm thì mới có ăn, không làm mà đòi biết tuổi à?",
    "Yamete kudasai~ Đừng click nữa đau em!",
    "Phát hiện liêm sỉ của bạn đã rớt đâu đó quanh đây.",
    "Ơ kìa? Sao lại nhập số này? Bị ngáo à?",
    "Server đang quá tải vì sự 'lỏ' của bạn!"
  ];

  const generateFakeIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  };

  // Annoying popup messages
  const annoyingMessages = [
    "CLICK VÀO ĐÂY ĐỂ NHẬN 1 TRIỆU ĐÔ!",
    "BẠN ĐÃ TRÚNG THƯỞNG!",
    "VIRUS ĐÃ ĐƯỢC PHÁT HIỆN!",
    "MÁY TÍNH CỦA BẠN ĐANG CHẬM!",
    "CẬP NHẬT NGAY BÂY GIỜ!",
    "BẠN CÓ 999+ THÔNG BÁO!",
    "ĐĂNG KÝ NGAY ĐỂ NHẬN QUÀ!",
    "BẠN ĐÃ BỊ HACK!",
    "TẢI NGAY PHẦN MỀM DIỆT VIRUS!",
    "IP CỦA BẠN ĐÃ BỊ LỘ!",
    "FBI ĐANG THEO DÕI BẠN!",
    "NHẤN VÀO ĐÂY ĐỂ XÓA VIRUS!",
    "BẠN ĐÃ TRÚNG IPHONE 15!",
    "CẢNH BÁO: MÁY TÍNH BỊ NHIỄM!",
    "TẢI NGAY ĐỂ NHẬN 1000$!",
    "BẠN CẦN CẬP NHẬT TRÌNH DUYỆT!",
    "CLICK ĐỂ XEM ẢNH NÓNG!",
    "BẠN ĐÃ THẮNG XỔ SỐ!",
    "NHẤN VÀO ĐÂY ĐỂ TĂNG TỐC!",
    "CẢNH BÁO: RAM ĐÃ HẾT!",
    "BẠN CÓ TIN NHẮN MỚI!",
    "ĐĂNG NHẬP NGAY ĐỂ NHẬN QUÀ!",
    "BẠN ĐÃ BỊ KHÓA TÀI KHOẢN!",
    "XÁC NHẬN NGAY ĐỂ MỞ KHÓA!",
    "TẢI NGAY ĐỂ TRÁNH BỊ HACK!",
    "BẠN ĐÃ TRÚNG XE HƠI!",
    "CLICK ĐỂ XEM VIDEO HOT!",
    "CẢNH BÁO: PIN SẮP HẾT!",
    "NHẤN VÀO ĐÂY ĐỂ SẠC PIN!",
    "BẠN CÓ 1000+ EMAIL CHƯA ĐỌC!"
  ];

  const handleCalculate = () => {
    console.log('Button clicked!', { age });

    if (!age || age.trim() === '') {
      alert("CLM CHƯA NHẬP cailonqu GÌ SAO TÍNH, FBI À?!?");
      return;
    }

    const numAge = parseInt(age);
    const isAgeInvalid = Number.isNaN(numAge);

    console.log('Parsed age:', numAge, 'isNaN:', isAgeInvalid);

    // Check for special cases first
    if (isAgeInvalid) {
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

  if (showWarning) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-red-600 text-white p-8 border-4 border-yellow-400 rounded-none shadow-[0_0_0_10px_#ff0000]">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Comic Sans MS' }}>CẢNH BÁO ĐỘNG KINH VÀ TỰ KỶ!!!</h2>
          <p className="mb-4" style={{ fontFamily: 'Courier New' }}>Nói chung đây là một cái cảnh báo, thế đấy :v</p>
          <button onClick={() => setShowWarning(false)} className="bg-green-500 text-black px-4 py-2 border-2 border-black font-bold" style={{ fontFamily: 'Comic Sans MS' }}>TÔI CHẤP NHẬN RỦI RO</button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full p-4 flex flex-col items-center justify-center font-mono overflow-hidden relative"
      style={{
        background: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite',
        transform: screenShake ? 'translate(2px, 2px)' : 'translate(0, 0)',
        transition: 'transform 0.1s'
      }}
    >
      {/* Floating Background Images - Behind everything */}
      {floatingBackgroundImages.map((img) => (
        <img
          key={img.id}
          src={img.src}
          alt="background"
          className="fixed pointer-events-none z-0"
          style={{
            left: img.x,
            top: img.y,
            width: `${300 * img.scale}px`,
            height: `${300 * img.scale}px`,
            transform: `translate(-50%, -50%) rotate(${img.rotation}deg)`,
            opacity: img.opacity,
            filter: 'blur(2px)',
            objectFit: 'contain'
          }}
        />
      ))}

      <style>{`
        @keyframes gradientShift {
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
        @keyframes screenShake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, 2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          90% { transform: translate(-2px, -2px); }
        }
        @keyframes popupFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes popupPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes cursorTrail {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes downloadProgress {
          0% { width: 0%; }
          100% { width: var(--progress); }
        }
        @keyframes borderGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(57,255,20,0.5), 
                        0 0 40px rgba(255,0,255,0.3),
                        inset 0 0 20px rgba(57,255,20,0.2);
          }
          50% { 
            box-shadow: 0 0 40px rgba(57,255,20,0.8), 
                        0 0 80px rgba(255,0,255,0.6),
                        inset 0 0 40px rgba(57,255,20,0.4);
          }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: #ec4899; }
          25% { border-color: #10b981; }
          50% { border-color: #f59e0b; }
          75% { border-color: #3b82f6; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes cornerFlash {
          0%, 90%, 100% { opacity: 0; }
          5%, 10% { opacity: 1; }
        }
        @keyframes boxFloat {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
        }
        @keyframes matrixRain {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes particleFloat {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0; }
        }
        .shake { animation: shake 0.5s infinite; }
        .popup-annoying {
          animation: popupFloat 3s ease-out forwards, popupPulse 0.5s ease-in-out infinite;
          pointer-events: none;
          user-select: none;
        }
        .glitch-text {
          animation: glitch 0.3s infinite;
          text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
        }
      `}</style>

      {/* Cursor Trails */}
      {cursorTrails.map((trail) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[200]"
          style={{
            left: trail.x - 5,
            top: trail.y - 5,
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,255,0,0.4) 50%, transparent 100%)',
            animation: 'cursorTrail 1s ease-out forwards',
            boxShadow: '0 0 20px rgba(255,0,0,0.8)'
          }}
        />
      ))}

      {/* Fake Cursors */}
      {fakeCursors.map((cursor) => (
        <div
          key={cursor.id}
          className="fixed pointer-events-none z-[150]"
          style={{
            left: cursor.x,
            top: cursor.y,
            width: '20px',
            height: '20px',
            background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23ff0000\' d=\'M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z\'/%3E%3C/svg%3E")',
            backgroundSize: 'contain',
            filter: 'drop-shadow(0 0 5px rgba(255,0,0,0.8))',
            transform: 'translate(-5px, -5px)'
          }}
        />
      ))}

      {/* Floating Icons */}
      {floatingIcons.map((icon) => (
        <img
          key={icon.id}
          src={icon.src}
          alt="floating icon"
          className="fixed pointer-events-none z-[120]"
          style={{
            left: icon.x,
            top: icon.y,
            width: `${80 * icon.scale}px`,
            height: `${80 * icon.scale}px`,
            transform: `translate(-50%, -50%) rotate(${icon.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px rgba(255,0,0,0.8)) drop-shadow(0 0 20px rgba(255,255,0,0.6))',
            animation: 'popupPulse 1s ease-in-out infinite',
            opacity: 0.9
          }}
        />
      ))}

      {/* Fake Download Bars */}
      {fakeDownloads.map((download) => (
        <div
          key={download.id}
          className="fixed bottom-4 left-4 bg-black border-2 border-lime-500 p-3 z-[80] min-w-[300px]"
          style={{ fontFamily: 'Courier New' }}
        >
          <div className="text-lime-500 text-sm mb-1">📥 Đang tải: {download.filename}</div>
          <div className="w-full bg-gray-800 h-4 border border-lime-500">
            <div
              className="bg-lime-500 h-full transition-all duration-200"
              style={{
                width: `${download.progress}%`,
                boxShadow: '0 0 10px rgba(57,255,20,0.8)'
              }}
            />
          </div>
          <div className="text-pink-500 text-xs mt-1">{download.progress.toFixed(0)}%</div>
        </div>
      ))}

      {/* Fake Typing Indicator */}
      {fakeTyping && (
        <div
          className="fixed bottom-20 right-4 bg-black border-2 border-pink-500 p-3 z-[80] animate-blink"
          style={{ fontFamily: 'Courier New' }}
        >
          <div className="text-pink-500 text-sm">⌨️ {fakeTyping}</div>
        </div>
      )}

      {/* Annoying Popup Texts */}
      {annoyingPopups.map((popup) => {
        const randomBgImage = backgroundImages.length > 0
          ? backgroundImages[Math.floor(Math.random() * backgroundImages.length)]
          : mainIcon;

        return (
          <div
            key={popup.id}
            className="popup-annoying fixed z-[60] font-bold text-yellow-300 text-lg md:text-xl flex items-center gap-2"
            style={{
              left: `${popup.left}%`,
              top: `${popup.top}%`,
              transform: `rotate(${popup.rotation}deg)`,
              opacity: popup.opacity,
              textShadow: '0 0 10px #ff0000, 0 0 20px #ff0000, 0 0 30px #ff0000',
              fontFamily: 'Comic Sans MS',
              whiteSpace: 'nowrap',
              filter: 'drop-shadow(0 0 5px rgba(255,255,0,0.8))'
            }}
          >
            {backgroundImages.length > 0 && (
              <img
                src={randomBgImage}
                alt="popup icon"
                className="w-6 h-6 animate-spin"
                style={{ filter: 'drop-shadow(0 0 5px rgba(255,0,0,0.8))' }}
              />
            )}
            {popup.message}
          </div>
        );
      })}

      {/* Fake Alerts */}
      {fakeAlerts.map((alert) => (
        <div
          key={alert.id}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-red-600 border-4 border-yellow-400 text-white p-4 z-[100] animate-shake shadow-[0_0_20px_#ff0000] font-bold text-lg"
          style={{ animation: 'shake 0.5s infinite' }}
        >
          {alert.message}
        </div>
      ))}

      {/* Fake Warning Popup */}
      {showFakeWarning && (
        <div className="fixed inset-0 bg-black/80 z-[90] flex items-center justify-center">
          <div className="bg-red-600 border-8 border-yellow-400 p-8 max-w-md text-center animate-shake">
            <div className="text-4xl mb-4">⚠️</div>
            <div className="text-white font-bold text-2xl mb-4">
              CẢNH BÁO: HỆ THỐNG ĐANG BỊ TẤN CÔNG!
            </div>
            <div className="text-yellow-300 text-lg mb-4">
              IP CỦA BẠN: {fakeIP}
            </div>
            <div className="text-white text-sm">
              Đang kết nối đến server FBI...
            </div>
          </div>
        </div>
      )}

      {/* Marquee Header */}
      <div className="fixed top-0 left-0 w-full bg-black border-b-4 border-lime-500 z-50">
        <marquee className="text-lime-500 font-bold text-xl py-2 font-['Courier_New']">
          ⚠️ ĐĂNG KHOA - THE GLITCH IN THE MATRIX - OTAKU HỆ ĐIỀU HÀNH - CODE BẰNG TÂM LINH, FIX BUG BẰNG NƯỚC MẮT - TOP 1 SERVER LOCALHOST - HACKER SỐ 1 VIỆT NAM (TỰ PHONG) - ĐANG BẬN CỨU THẾ GIỚI KHỎI MA VƯƠNG DEADLINE - PLAYER: ĐĂNG KHOA [LV. 9999] - CLASS: PHÁP SƯ CÔNG NGHỆ (HỆ LỬA/CHÁY MÁY) - DANH HIỆU: 'THÁNH BUG VIỆT NAM' - SỞ HỮU VŨ KHÍ TỐI THƯỢNG: BÀN PHÍM RGB TĂNG 200% SÁT THƯƠNG VẬT LÝ LÊN MÀN HÌNH. ⚠️
        </marquee>
      </div>

      {/* Main Container */}
      <div
        className="relative z-10 bg-black border-8 border-double p-8 max-w-2xl w-full transform"
        style={{
          animation: 'borderGlow 3s ease-in-out infinite, borderPulse 4s ease-in-out infinite, boxFloat 6s ease-in-out infinite',
          boxShadow: '0 0 30px rgba(57,255,20,0.6), 0 0 60px rgba(255,0,255,0.4), 10px 10px 0px 0px rgba(57,255,20,1), inset 0 0 30px rgba(57,255,20,0.1)',
          position: 'relative',
          overflow: 'hidden',
          borderColor: '#ec4899'
        }}
      >
        {/* Scan Line Effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(57,255,20,0.1) 50%, transparent 100%)',
            animation: 'scanLine 3s linear infinite',
            height: '2px',
            zIndex: 1
          }}
        />

        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-lime-500" style={{ animation: 'cornerFlash 2s ease-in-out infinite' }} />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-pink-500" style={{ animation: 'cornerFlash 2s ease-in-out infinite 0.5s' }} />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-pink-500" style={{ animation: 'cornerFlash 2s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-lime-500" style={{ animation: 'cornerFlash 2s ease-in-out infinite 1.5s' }} />

        {/* Animated Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.1) 2px, rgba(57,255,20,0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,0,255,0.1) 2px, rgba(255,0,255,0.1) 4px)
            `,
            animation: 'boxFloat 8s ease-in-out infinite'
          }}
        />

        {/* Floating Particles Around Box */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '4px',
              height: '4px',
              background: i % 2 === 0 ? '#39ff14' : '#ff00ff',
              borderRadius: '50%',
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#39ff14' : '#ff00ff'}`,
              animation: `particleFloat ${3 + Math.random() * 2}s ease-in-out ${i * 0.3}s infinite`,
              '--tx': `${(Math.random() - 0.5) * 200}px`,
              '--ty': `${(Math.random() - 0.5) * 200}px`
            }}
          />
        ))}

        {/* Content Wrapper */}
        <div className="relative" style={{ zIndex: 100, position: 'relative' }}>
          <div className="relative flex items-center justify-center mb-8">
            <img
              src={mainIcon}
              alt="icon"
              className="absolute -left-20 md:-left-32 w-16 h-16 md:w-24 md:h-24 animate-spin"
              style={{ filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.8))' }}
            />
            <h1 className={`text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-pink-500 font-['Comic_Sans_MS'] animate-pulse drop-shadow-[0_0_10px_rgba(57,255,20,0.8)] ${glitchText ? 'glitch-text' : ''}`}>
              QUANTUM-NEURAL-AGE-PREDICTOR
            </h1>
            <img
              src="/secondary-icon.jpg"
              alt="icon"
              className="absolute -right-20 md:-right-32 w-16 h-16 md:w-24 md:h-24 animate-spin"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255,0,255,0.8))',
                animationDirection: 'reverse'
              }}
            />
          </div>

          {!loading && !result && (
            <div className="flex flex-col gap-6" style={{ position: 'relative', zIndex: 100 }}>
              <div className="relative group">
                {/* Decorative Elements Around Input */}
                <div className="absolute -top-8 left-0 right-0 flex justify-between pointer-events-none">
                  <Skull size={32} className="text-lime-500 animate-pulse" />
                  <AlertTriangle size={32} className="text-pink-500 animate-pulse" />
                  <Lock size={32} className="text-yellow-400 animate-pulse" />
                </div>

                <label className="text-lime-500 text-xl font-bold mb-2 block animate-blink relative">
                  &gt; NHập tuổi của bạn oke? :
                  <span className="absolute -right-2 top-0 text-pink-500 animate-pulse">⚠️</span>
                  <span className="absolute left-0 top-0 text-red-500 animate-bounce">💀</span>
                </label>

                {/* Input with More Decorations */}
                <div className="relative" style={{ zIndex: 150, position: 'relative' }}>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full bg-black border-4 border-lime-500 text-pink-500 text-6xl p-4 focus:outline-none focus:border-pink-500 focus:shadow-[0_0_30px_#ff00ff,0_0_60px_#ff00ff] transition-all font-['Courier_New'] text-center"
                    placeholder="???"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(57,255,20,0.3), 0 0 20px rgba(255,0,255,0.2)',
                      position: 'relative',
                      zIndex: 150,
                      pointerEvents: 'auto',
                      isolation: 'isolate'
                    }}
                  />

                  {/* Animated Border Around Input */}
                  <div className="absolute inset-0 border-4 border-pink-500 animate-pulse pointer-events-none" style={{
                    boxShadow: '0 0 20px rgba(255,0,255,0.6)',
                    zIndex: 5
                  }}></div>

                  {/* Corner Decorations */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-lime-500" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-pink-500" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite' }}></div>
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-pink-500" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite' }}></div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-lime-500" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 1.5s infinite' }}></div>
                </div>

                {/* Multiple Icons Around Input */}
                <div className="absolute -right-6 -top-4 text-pink-500" style={{ animation: 'bounce 1s infinite' }}>
                  <Skull size={48} />
                </div>
                <div className="absolute -left-6 -top-4 text-lime-500" style={{ animation: 'bounce 1s 0.3s infinite' }}>
                  <AlertTriangle size={40} />
                </div>
                <img
                  src={mainIcon}
                  alt="icon"
                  className="absolute -left-4 -bottom-4 w-12 h-12 animate-spin opacity-70"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(255,0,255,0.8))' }}
                />
                <img
                  src={backgroundImages.length > 0 ? backgroundImages[0] : mainIcon}
                  alt="icon"
                  className="absolute -right-4 -bottom-4 w-10 h-10 animate-spin opacity-60"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(57,255,20,0.8))',
                    animationDirection: 'reverse',
                    animationDuration: '2s'
                  }}
                />

                {/* Floating Warning Text */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-red-500 text-xs font-bold animate-blink">
                  ⚠️ CẢNH BÁO: HỆ THỐNG NGUY HIỂM ⚠️
                </div>
              </div>

              <div className="relative" style={{ zIndex: 200, position: 'relative' }}>
                {/* Decorative Icons Around Button - Outside */}
                <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-red-500 animate-spin pointer-events-none" style={{ animationDuration: '3s', zIndex: 1 }}>
                  <Skull size={40} />
                </div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-yellow-400 animate-spin pointer-events-none" style={{ animationDuration: '3s', animationDirection: 'reverse', zIndex: 1 }}>
                  <Skull size={40} />
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 text-pink-500 animate-bounce pointer-events-none" style={{ zIndex: 1 }}>
                  <AlertTriangle size={32} />
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-lime-500 pointer-events-none" style={{ animation: 'bounce 1s 0.5s infinite', zIndex: 1 }}>
                  <Lock size={32} />
                </div>

                {/* Main Button - Simple and Clickable */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('Button onClick triggered!', { age });
                    handleCalculate();
                  }}
                  className="relative w-full bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 hover:from-blue-700 hover:via-red-700 hover:to-blue-700 text-white text-2xl md:text-3xl font-bold py-6 px-8 border-4 border-white shadow-[0_0_30px_rgba(0,0,255,0.8),8px_8px_0px_0px_#000000] active:shadow-none active:translate-x-2 active:translate-y-2 transition-all hover:animate-shake font-['Comic_Sans_MS'] uppercase tracking-widest"
                  style={{
                    animation: 'borderGlow 2s ease-in-out infinite',
                    boxShadow: '0 0 30px rgba(0,0,255,0.8), 0 0 60px rgba(255,0,0,0.6), 8px 8px 0px 0px #000000',
                    position: 'relative',
                    zIndex: 300,
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    isolation: 'isolate',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                >
                  {/* Simple Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-red-600 to-blue-600 opacity-75 animate-pulse pointer-events-none" style={{ zIndex: 1 }}></div>

                  {/* Button Text - Clickable Area */}
                  <span className="relative z-50 flex items-center justify-center gap-4" style={{ pointerEvents: 'none', userSelect: 'none' }}>
                    <Terminal size={32} className="animate-pulse" />
                    <span className="relative">
                      🔗 KẾT NỐI TỚI CIA 🔗
                    </span>
                    <AlertTriangle size={32} className="animate-pulse" />
                  </span>
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-black border-4 border-lime-500 p-4 font-['Courier_New'] h-96 flex flex-col relative">
              <div className="absolute top-2 right-2 animate-spin text-lime-500">
                <Lock size={24} />
              </div>

              <div className="flex-1 overflow-y-auto mb-4 pr-2">
                <div className="text-lime-500 text-lg space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="break-words">
                      <span className="text-pink-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>

              <div className="pt-4 border-t border-lime-500/30 animate-pulse text-center text-pink-500 font-bold text-2xl">
                ĐANG TÍNH TOÁN... {(logs.length / fakeLogs.length * 100).toFixed(0)}%
              </div>
              {fakeIP && (
                <div className="text-xs text-red-500 mt-2 text-center animate-blink">
                  IP TRUY VẾT: {fakeIP} | VỊ TRÍ: SOMEWHERE, VIỆT NAM
                </div>
              )}
            </div>
          )}

          {result && (
            <div className="text-center space-y-6 animate-bounce">
              <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-[4px_4px_0px_#ff00ff] font-['Comic_Sans_MS']">
                {age}
              </div>
              <div className="text-2xl md:text-4xl text-lime-500 font-bold font-['Courier_New'] border-4 border-lime-500 p-4 bg-black/80">
                {result}
              </div>
              <div className="text-xl text-pink-500 font-bold bg-white p-2 transform -rotate-2">
                {trollMessage}
              </div>
              <button
                onClick={() => { setResult(null); setAge(''); setTrollMessage(''); }}
                className="mt-8 bg-lime-500 text-black font-bold py-3 px-6 hover:bg-lime-400 border-4 border-black shadow-[4px_4px_0px_0px_#ffffff]"
              >
                TÍNH TOÁN LẠI
              </button>
            </div>
          )}

          {!loading && !result && trollMessage && (
            <div className="mt-6 text-center">
              <div className="text-2xl text-red-500 font-bold bg-yellow-300 p-4 border-4 border-red-500 transform rotate-2 animate-shake">
                {trollMessage}
              </div>
              <button
                onClick={() => { setTrollMessage(''); setAge(''); }}
                className="mt-4 bg-lime-500 text-black font-bold py-2 px-4 hover:bg-lime-400 border-2 border-black"
              >
                THỬ LẠI
              </button>
            </div>
          )}
        </div>
        {/* End Content Wrapper */}
      </div>
      {/* End Main Container */}

      <div className="fixed bottom-4 right-4 text-white/50 text-xs font-mono">
        v3.6.0 - Đăng Khoa làm ra cái này đấy - bủh buh lmao
      </div>
      {fakeIP && loading && (
        <div className="fixed bottom-4 left-4 text-red-500 text-xs font-mono animate-blink border-2 border-red-500 p-2 bg-black/80">
          🔴 ĐANG THEO DÕI: {fakeIP}
        </div>
      )}
    </div>
  );
};

export default SmartAgeCalculator;