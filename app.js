document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.getElementById("shareBtn");
  const copyBtn  = document.getElementById("copyBtn");
  const toast    = document.getElementById("toast");

  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => (toast.textContent = ""), 2200);
  }

  async function copyText(text){
    try{
      await navigator.clipboard.writeText(text);
      return true;
    }catch(e){
      try{
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      }catch(e2){
        return false;
      }
    }
  }

  shareBtn?.addEventListener("click", async () => {
    const url = window.location.href;

    try{
      if (navigator.share){
        await navigator.share({
          title: document.title,
          text: "IBMU • Links oficiais",
          url
        });
        showToast("Compartilhado ✅");
      } else {
        const ok = await copyText(url);
        showToast(ok ? "Link copiado ✅" : "Não foi possível copiar.");
      }
    } catch (e){
      showToast("Ação cancelada.");
    }
  });

  copyBtn?.addEventListener("click", async () => {
    const ok = await copyText(window.location.href);
    showToast(ok ? "Link copiado ✅" : "Não foi possível copiar.");
  });
});