# TODO: Fix Category Filter

## Backend Changes
- [x] Update NoticiaRepository.java: Modify findAllCategorias() query to filter null/empty categoria at DB level
- [x] Update NoticiaService.java: Ensure categoria is trimmed and validated before saving

## Frontend Changes
- [x] Update App.js: Improve category extraction logic to properly filter categories

## Testing
- [ ] Test category filter in frontend to confirm categories appear
- [ ] Test news creation with categories to ensure they are saved correctly
