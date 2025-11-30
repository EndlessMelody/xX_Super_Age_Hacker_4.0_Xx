# Background Images Folder

Thêm các file ảnh JPG vào folder này để chúng tự động xuất hiện và trôi random trong background của ứng dụng.

## Cấu trúc tên file:

- **Icons**: `main-icon.jpg`, `secondary-icon.jpg` (trong `src/assets/` và `public/`)
- **Background Images**: `bg-001.jpg`, `bg-002.jpg`, `bg-003.jpg`, ... (trong folder này)

## Cách sử dụng:

1. Thêm các file ảnh JPG vào folder này với tên theo format: `bg-XXX.jpg` (XXX là số thứ tự 001, 002, 003, ...)
2. Ứng dụng sẽ tự động load tất cả ảnh JPG từ folder này
3. Các ảnh sẽ:
   - Trôi random trên màn hình
   - Có độ mờ (opacity 0.1-0.25)
   - Ở đằng sau tất cả các element khác (z-index = 0)
   - Tự động xoay và di chuyển
   - Có blur effect nhẹ

## Lưu ý:

- Chỉ hỗ trợ file .jpg
- Tên file nên theo format `bg-XXX.jpg` để dễ quản lý
- Ảnh sẽ được scale tự động (30-70% kích thước gốc)
- Tối đa 8-10 ảnh cùng lúc trên màn hình
- Ảnh sẽ tự động thay thế khi ra khỏi màn hình
