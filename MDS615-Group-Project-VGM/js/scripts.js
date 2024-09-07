// This JavaScript file provides basic navigation functionality.Students will expand this file to include more complex logic for the calendar and music player.
document.addEventListener('DOMContentLoaded', function() {
    const homeLink = document.getElementById('home-link');
    const calendarLink = document.getElementById('calendar-link');
    const musicLink = document.getElementById('music-link');
    const contactLink = document.getElementById('contact-link');

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
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Event 1',
                start: '2024-09-10',
            },
            {
                title: 'Event 2',
                start: '2024-09-15',
            }
        ]
    });
    calendar.render();

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
});

