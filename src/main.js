document.addEventListener('DOMContentLoaded', function() {
  const dropzone = document.getElementById('dropzone');
  const preview = document.getElementById('preview');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementsByClassName('close')[0];

  dropzone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', function() {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  dropzone.addEventListener('click', function() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*,video/*';
    fileInput.addEventListener('change', function() {
      handleFiles(fileInput.files);
    });
    fileInput.click();
  });

  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  function handleFiles(files) {
    for (const file of files) {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        alert('哎呀，啥玩意？这个文件类型不支持。');
        continue;
      }

      const url = URL.createObjectURL(file);
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview-item');

      const fileElement = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
      fileElement.src = url;
      if (file.type.startsWith('video/')) {
        fileElement.controls = true;
      }

      if (file.type.startsWith('image/')) {
        fileElement.addEventListener('click', function() {
          modal.style.display = 'block';
          modalImg.src = url;
        });
      }

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', function() {
        preview.removeChild(previewItem);
      });

      previewItem.appendChild(fileElement);
      previewItem.appendChild(deleteButton);
      preview.appendChild(previewItem);
    }
  }

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
