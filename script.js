document.addEventListener('DOMContentLoaded', function() {
    // טיפול בשליחת טופס ההתחברות
    document.querySelector('#login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // מניעת התנהגות ברירת מחדל של הטופס

        // הגדרת המשתנים
        var email = document.getElementById('email').value; 
        var password = document.getElementById('password').value;

        fetch('users.json') 
            .then(response => response.json()) // קריאה לקובץ JSON
            .then(data => {
                var user = data.users.find(user => user.email === email && user.password === password); // (DataBase) json בדיקת משתמש ואימייל - האם קיימים בקובץ ה
                if (user && isValidEmail(email)) { // האם המשתמש והאימייל אכן נמצאים
                    alert('The login was successful!'); // הוצאת הודעה למשתמש אם כן
                    localStorage.setItem('loggedInUser', JSON.stringify(user)); // שמירת נתוני המשתמש ב-LocalStorage
                    window.location.href = 'welcome.html'; // העברת המשתמש לדף ברוכים הבאים
                } else { // אחרת
                    alert('Incorrect email or password. Please try again.');
                }
            }) // Json - DataBase הוצאת הודעה אם לא נמצא ב
            .catch(error => console.error('Error reading user data:', error));
    });
    
    // פונקציה לבדוק אם האימייל תקין
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // צורה מוגדרת לבדיקת תקינות תצורת האימייל אשר אוזן במערכת
        return emailRegex.test(email); // לצורך בדיקת האימייל אשר אוזן test שימוש בפונקציית 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // הגדרת משתנים
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')); // .'loggedInUser' תחת המפתח localStorage פונקציה זו שולפת את המחרוזת השמורה ב - localStorage.getItem():
    var headerHomeElement = document.getElementById('HeaderHome'); 

    if (loggedInUser) { // האם הצליח לשלוף את הנתונים

        if (headerHomeElement) { // האם הצליח למשוך את הכותרת אותה אנו מעוניינים לשנות

            headerHomeElement.innerHTML = 'Welcome To Success Studios, ' + loggedInUser.username + '!'; //localStorage אז אנו נוסיף לכותרת את שם המשתמש הנלקח מה h4 אם אכן הצליח למשוך את 
        } 
        else {
            console.error('Element with id "HeaderHome" not found.');
        }
    } 
    else {
        console.error('Logged in user data not found in localStorage.');
    }
});

