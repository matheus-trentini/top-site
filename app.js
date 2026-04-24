// MOBILE MENU HANDLER
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('active');
  });

  // Fechar menu ao clicar em um link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
    });
  });

  // Fechar menu ao redimensionar para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const galleryModal = document.getElementById('galleryModal');
  const galleryLinks = document.querySelectorAll('.open-gallery');
  const galleryClose = document.getElementById('closeGallery');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');
  const photoCounter = document.getElementById('photoCounter');

  const albumPhotos = [
    'album/1 (2).jpg',
    'album/10.jpg',
    'album/11.jpg',
    'album/13.jpg',
    'album/14.jpg',
    'album/15.jpg',
    'album/16.jpg',
    'album/17.jpg',
    'album/18.jpg',
    'album/2.jpg',
    'album/3.jpg',
    'album/4.jpg',
    'album/5.jpg',
    'album/7.jpg',
    'album/8.jpg'
  ];

  let currentPhotoIndex = 0;

  function showPhoto(index) {
    if (!modalPhoto || !photoCounter) return;
    currentPhotoIndex = Math.max(0, Math.min(index, albumPhotos.length - 1));
    modalPhoto.src = albumPhotos[currentPhotoIndex];
    modalPhoto.alt = `Foto ${currentPhotoIndex + 1} do álbum`;
    photoCounter.textContent = `${currentPhotoIndex + 1} / ${albumPhotos.length}`;
  }

  function openGallery(event) {
    event.preventDefault();
    if (!galleryModal) return;
    showPhoto(0);
    galleryModal.classList.remove('hidden');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function previousPhoto(event) {
    event?.preventDefault();
    showPhoto(currentPhotoIndex - 1);
  }

  function nextPhoto(event) {
    event?.preventDefault();
    showPhoto(currentPhotoIndex + 1);
  }

  function closeGallery() {
    if (!galleryModal) return;
    galleryModal.classList.add('hidden');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryLinks.forEach((link) => {
    link.addEventListener('click', openGallery);
  });

  modalPrev?.addEventListener('click', previousPhoto);
  modalNext?.addEventListener('click', nextPhoto);
  galleryClose?.addEventListener('click', closeGallery);

  galleryModal?.addEventListener('click', (event) => {
    if (event.target === galleryModal) {
      closeGallery();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!galleryModal || galleryModal.classList.contains('hidden')) return;
    if (event.key === 'ArrowRight') {
      nextPhoto();
    } else if (event.key === 'ArrowLeft') {
      previousPhoto();
    } else if (event.key === 'Escape') {
      closeGallery();
    }
  });
});
