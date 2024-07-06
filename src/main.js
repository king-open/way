document.addEventListener('DOMContentLoaded', function() {
  const dropzone = document.getElementById('dropzone');
  const preview = document.getElementById('preview');

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

  function handleFiles(files) {
    for (const file of files) {
      const url = URL.createObjectURL(file);
      const previewItem = document.createElement('div');
      previewItem.classList.add('preview-item');

      const fileElement = document.createElement(file.type.startsWith('image/') ? 'img' : 'video');
      fileElement.src = url;
      if (file.type.startsWith('video/')) {
        fileElement.controls = true;
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
});
