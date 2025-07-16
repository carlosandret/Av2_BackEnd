function mostrarInputEdit() {
        const inputConteiner = document.getElementById('input-container')
        if (inputConteiner.style.display == 'block') { // Se a div estiver visível (block)
            inputConteiner.style.display = 'none'; // Irá ocultar a div
        } else {
            inputConteiner.style.display = 'block'; // Mostra a div novamente
        };
    }

    function mostrarInputDelete() {
        const inputConteiner = document.getElementById('input-container-delete')
        if (inputConteiner.style.display == 'block') { // Se a div estiver visível (block)
            inputConteiner.style.display = 'none'; // Irá ocultar a div
        } else {
            inputConteiner.style.display = 'block'; // Mostra a div novamente
        };
    }
