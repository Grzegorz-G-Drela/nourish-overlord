function saveData() {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nourish-overlord-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

saveBtn.addEventListener('click', saveData);

function loadData() {
    fileInput.click();
}

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        Object.keys(data).forEach(key => {
            localStorage.setItem(key, data[key]);
        });
    };
    reader.readAsText(file);
    location.reload();
});

loadBtn.addEventListener('click', loadData);
