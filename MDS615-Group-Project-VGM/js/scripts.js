document.addEventListener('DOMContentLoaded', function() {
    // 页面导航
    const homeLink = document.getElementById('home-link');
    const calendarLink = document.getElementById('calendar-link');
    const musicLink = document.getElementById('music-link');
    const contactLink = document.getElementById('contact-link');

    // button faseback
    const homeSection = document.getElementById('home');
    const calendarSection = document.getElementById('calendar');
    const musicSection = document.getElementById('music');
    const contactSection = document.getElementById('contact');

    homeLink.addEventListener('click', function() {
        homeSection.style.display = 'block';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'none';
        contactSection.style.display = 'none';
    });

    calendarLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'block';
        musicSection.style.display = 'none';
        contactSection.style.display = 'none';
    });

    musicLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'block';
        contactSection.style.display = 'none';
    });

    contactLink.addEventListener('click', function() {
        homeSection.style.display = 'none';
        calendarSection.style.display = 'none';
        musicSection.style.display = 'none';
        contactSection.style.display = 'block';
    });

    // 初始化 FullCalendar
    const calendarEl = document.getElementById('calendar-play');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [
                { title: 'Event 1', start: '2024-09-10' },
                { title: 'Event 2', start: '2024-09-15' }
            ]
        });
        calendar.render();
    }

    // 音乐播放器播放列表功能
    const audioPlayer = document.getElementById('music-player');
    const playlistItems = document.querySelectorAll('#playlist .list-group-item');
    playlistItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const songSrc = this.getAttribute('data-src');
            // 切换歌曲
            audioPlayer.src = songSrc;
            // 确保歌曲能自动播放
            audioPlayer.load(); 
            audioPlayer.play().catch(function(error) {
                console.error("Error playing audio: ", error);
            });
        });
    });

    // 视频播放器功能
    const videoPlayerContainer = document.getElementById('video-player');
    function loadYouTubeVideo(videoId) {
        if (videoPlayerContainer) {
            videoPlayerContainer.innerHTML = `<iframe width="1024" height="569" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        }
    }

    const videoPlaylistItems = document.querySelectorAll('#video-playlist .list-group-item');
    videoPlaylistItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const videoSrc = this.getAttribute('data-src');
            const url = new URL(videoSrc);
            const videoId = url.searchParams.get("v");
            loadYouTubeVideo(videoId);
        });
    });

    // 表单提交功能
    document.getElementById('commentForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // 表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // 使用 Fetch API 将表单数据发送给 Formspree
        fetch('https://formspree.io/f/meojwznk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
        .then(response => {
            if (response.ok) {
                // 显示成功提示
                document.getElementById('successMessage').style.display = 'block';
                // 清空表单
                document.getElementById('commentForm').reset();
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        alert(data.errors.map(error => error.message).join(", "));
                    } else {
                        alert("There's a mistake. Type it in again, bro.");
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There's a mistake. Type it in again, bro.");
        });
    });
});