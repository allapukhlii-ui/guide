

function openDetail(id) {
  const infos = {
    'port': 'Er ist der älteste Hafen Frankreichs und symbolisiert das Bild von Marseille. Geschützt durch die Festungen Saint-Nicolas und Saint-Jean, überragt vom Pharo-Palast und der bekannten Silhouette von Notre-Dame-de-la-Garde, gehört der Alte Hafen zu den wichtigsten Sehenswürdigkeiten für Besucher. Hier finden sich viele Restaurants, Geschäfte, Einkaufszentren, Cafés und Museen, die diesen belebten Treffpunkt und Spazierort umgeben.',
    'notredame': 'Der wahre Glanz des Wahrzeichens von Marseille ist im prächtigen Inneren vertreten. Die liebevoll „la bonne mère“ ( „die gute Mutter“) genannte Kirche blickt auf eine mehrere Jahrhunderte alte Geschichte zurück. Ursprünglich im 15. und 16. Jahrhundert  errichtet, wurde sie im 19. Jahrhundert schrittweise restauriert. In früheren Zeiten hatte sie vorranging die Bedeutung als Festung inne, während sie heute einen Wallfahrtsort für Gläubige darstellt. Durch die Lage der Kirche auf einer über 150 Meter hohen Anhöhe habt ihr von dort aus auch eine wunderbare Aussicht über Marseille. Schon allein deshalb lohnt sich der Besuch!',
    'mucem': 'Marseille begeistert mit reicher Geschichte und kultureller Vielfalt . Besonders sehenswert sind die zahlreichen interessanten Museen, wie das moderne Mucem, die einen spannenden Einblick in Kunst, Geschichte und die mediterrane Kultur bieten. modernes Museum über die Zivilisationen des Mittelmeers.',
    'calanques': 'Ruhe und Gelassenheit sind nach dem städtischen Trubel genau das Richtige? Dann auf in den Calanques Nationalpark! Es handelt sich um einen Naturpark mit den sogenannten „Calanques“ im Mittelpunkt. Der Nationalpark gehört zu den Lieblingsattraktionen von Wanderern, Tierbeobachtern und Naturfotografen, denn mit ein bisschen Glück sind Tiere wie Delfine und Meeresschildkröten im geschützten Meeresteil des Gebiets zu sehen. Das Ganze geht jedoch nur zwischen Oktober und Juni, denn von Juli bis September ist der Park für die Öffentlichkeit geschlossen',
    'panier': 'Le Panier als ältester Teil von Marseille sollte ebenfalls nicht fehlen, wenn ihr die Stadt erkundet. Beim Gang durch die schmalen Gassen wird euch die Street-Art nicht verborgen bleiben. Der Fotoapparat klickt hier wohl mehr als nur einmal! Kleine Pausen sind in den gemütlichen Cafés ebenso möglich wie Abstecher in die inhabergeführten Läden, in denen einige Schätze zu finden sein sollten.',
    'if': 'Im 16. Jahrhundert entstand die Festung Château d’If auf einer vorgelagerten Insel vor Marseille. Sie sollte den Hafenzugang vor Angriffen schützen und gleichzeitig die Überwachung der Stadt sichern. Ihr kamen unterschiedliche Funktionen zu, etwa als reine Schutzfestung oder als Gefängnis und Kerker. Auch von dieser Festung aus, die ihr per Fähre erreicht, habt ihr einen traumhaften Blick über die Gegend. Zudem könnt ihr die Ausstellung im Inneren des Châteaus d’Ifs gegen ein kleines Eintrittsgeld besuchen und mehr über die Festung und ihre Geschichte erfahren.'
  };

  alert(infos[id]); // Zeigt die Info in einem Popup
}


document.addEventListener('DOMContentLoaded', () => {
    const cardGroups = document.querySelectorAll('.card-group');

    cardGroups.forEach(group => {
        const id = group.getAttribute('data-id');
        const stars = group.querySelectorAll('.star');
        const saveBtn = group.querySelector('.save-btn');
        const textarea = group.querySelector('textarea');
        const display = group.querySelector('.feedback-display');
        
        let selectedRating = 0;

        // Sterne anklickbar machen
        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = star.getAttribute('data-value');
                updateStarUI(stars, selectedRating);
            });
        });

        function updateStarUI(starElements, rating) {
            starElements.forEach(s => {
                if (s.getAttribute('data-value') <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        }

        // Speichern-Button
        saveBtn.addEventListener('click', () => {
            const text = textarea.value.trim();
            
            if (selectedRating === 0 || text === "") {
                alert("Bitte wähle Sterne und schreibe einen kurzen Text!");
                return;
            }

            const newFeedback = {
                rating: selectedRating,
                comment: text,
                date: new Date().toLocaleDateString('de-DE')
            };

            // Im LocalStorage speichern
            let storageKey = `feedback_${id}`;
            let existingData = JSON.parse(localStorage.getItem(storageKey)) || [];
            existingData.push(newFeedback);
            localStorage.setItem(storageKey, JSON.stringify(existingData));

            // Formular zurücksetzen
            textarea.value = "";
            selectedRating = 0;
            updateStarUI(stars, 0);

            // Anzeige aktualisieren
            renderFeedback(id, display);
        });

        // Funktion zum Anzeigen der Kommentare
        function renderFeedback(placeId, container) {
            let data = JSON.parse(localStorage.getItem(`feedback_${placeId}`)) || [];
            container.innerHTML = data.map(item => `
                <div class="feedback-item">
                    <strong>${"★".repeat(item.rating)}${"☆".repeat(5-item.rating)}</strong>
                    <p>${item.comment}</p>
                    <small>${item.date}</small>
                </div>
            `).join('');
        }

        // Beim Laden der Seite alte Kommentare anzeigen
        renderFeedback(id, display);
    });
});