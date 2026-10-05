# Kiến trúc và hướng mở rộng

## Nguyên tắc hiện tại

- **Nguồn và output tách biệt:** viết trong `src/`, giữ tài nguyên trong `public/`, để Next.js tạo `out/` khi build.
- **Layout dùng chung:** `app/layout.tsx` chứa header, footer, menu, cửa sổ liên hệ và cửa sổ dự án. Các trang mới tự nhận layout này.
- **Component theo chức năng:** từng section có file riêng; nội dung dự án/dịch vụ/FAQ tách khỏi markup và hiệu ứng.
- **Server/Client rõ ràng:** giao diện chính được render lúc build; chỉ bộ điều khiển tương tác và cửa sổ dự án dùng Client Components. Không truy cập `window` hoặc `document` khi render trên server.
- **CSS giữ thiết kế:** tiếp tục dùng `src/styles/main.css`, không ép chuyển sang Tailwind. Còn các khai báo override kế thừa để giữ giao diện; chuyển framework không đồng nghĩa toàn bộ CSS đã được rút gọn. Khi thêm trang, ưu tiên CSS Modules cho phần riêng để tránh ảnh hưởng trang chủ.
- **Hiệu ứng có vòng đời:** mỗi module theo dõi listener, timer, animation frame và observer qua `scope.js`. Unmount hủy tài nguyên, canvas/GPU được giải phóng và markup thay đổi bởi hiệu ứng được khôi phục. Menu dùng animation gốc; project dialog render nội dung bằng React, không chèn dữ liệu dự án bằng `innerHTML`.
- **Dependency ổn định:** khóa phiên bản bằng `package-lock.json`; dùng `npm ci` trên CI/Vercel. Next.js/React vẫn cần được cập nhật và kiểm tra định kỳ, không tự động đổi phiên bản lớn.

## Trang chi tiết dự án

Chưa tạo trang chi tiết trong đợt chuyển cấu trúc này; nút Explore project vẫn mở cửa sổ đã có.

Khi triển khai:

1. Tạo `src/app/work/[slug]/page.tsx` và component nội dung dự án riêng.
2. Đọc từ `src/content/projects.ts`; thay concept bằng thông tin thật.
3. Dùng `generateStaticParams()` xuất danh sách slug lúc build; route không tồn tại trả 404.
4. Tạo title, description và canonical riêng cho từng dự án qua `generateMetadata()`.
5. Đổi card thành liên kết `next/link` đến URL chi tiết. Layout chung đã có menu/footer; menu điều hướng được cả về các section trang chủ từ trang khác.

Khi thay dữ liệu cần build/deploy lại. Không chỉnh tay các HTML trong `out/`.

## Tích hợp dịch vụ

| Nhu cầu                                             | Cách triển khai                                                                         |
| --------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Messenger/Zalo/social                               | Sửa `src/config/site.ts`                                                                |
| CMS cung cấp dự án/bài viết                         | Thêm adapter vào `src/lib/`, lấy dữ liệu lúc build; webhook CMS gọi deploy hook Vercel  |
| Analytics hoặc widget công khai                     | Client Component riêng, tải script theo tài liệu nhà cung cấp và nhu cầu quyền riêng tư |
| API công khai trên trình duyệt                      | Client Component với loading/error; dịch vụ cần hỗ trợ CORS và cơ chế xác thực phù hợp  |
| Form có khóa bí mật, webhook, đăng nhập, thanh toán | Cần backend; chuyển sang Next.js server trên Vercel hoặc dùng backend bên ngoài         |

`output: "export"` **không chạy Route Handler động, Server Actions, session phía server hoặc webhook nhận request**. Để chạy các chức năng đó trong Next.js trên Vercel, bỏ `output: "export"`, bỏ Output Directory `out` trong cấu hình deploy và dùng runtime Next.js của Vercel. Khi đó `next start` mới phù hợp để chạy server production; script `start` hiện tại chỉ phục vụ output tĩnh.

Bản xem trực tiếp trên Sites hiện dùng output tĩnh. Đổi sang server trên Vercel không tự đổi cách hosting trên Sites; cần xử lý môi trường tương ứng khi triển khai chức năng server.

Không đặt secret trong `site.ts`, nội dung, `public/` hoặc biến `NEXT_PUBLIC_*`. Mỗi dịch vụ có yêu cầu riêng về API, quyền truy cập và runtime; cấu trúc có thể mở rộng nhưng không thể đảm bảo tương thích với mọi dịch vụ mà không cấu hình hay thay đổi code.

## Kiểm tra khi cập nhật

Chạy `npm run check` và `npm run format:check`. Với thay đổi giao diện/hiệu ứng, kiểm tra thêm desktop, tablet, mobile; menu/dialog bằng bàn phím; reduced motion; fallback liên hệ khi JavaScript không chạy. Test tự động hiện có kiểm tra dọn tài nguyên và hình học hiệu ứng hero, không thay thế kiểm tra trực quan toàn bộ website.
