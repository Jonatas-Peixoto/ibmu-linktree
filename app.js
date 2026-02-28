document.getElementById("year").textContent = new Date().getFullYear();

const shareBtn = document.getElementById("shareBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

function showToast(msg){
    toast.textContent = msg;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => (toast.textContent = ""), 2200);
}

shareBtn?.addEventListener("click", async () => {
    const url = window.location.href;
    const data = {
        title: document.title,
        text: "IBMU • Links oficiais",
        url
    };

    try{
        if (navigator.share){
            await navigator.share(data);
        } else {
            await navigator.clipboard.writeText(url);
            showToast("Compartilhamento não suportado - Link copiado.");
        }
    } catch (e){
        showToast("Não foi possível compartilhar.");
    }
});

copyBtn?.addEventListener("click", async () => {
    const url = window.location.href;
    try{
        await navigator.clipboard.writeText(url);
        showToast("Link copiado ✔");
    } catch (e){
        showToast("Não foi possível copiar.");
    }
});