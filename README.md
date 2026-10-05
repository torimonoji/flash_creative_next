# Flash Creative

Trang chủ portfolio đã chuyển sang **Next.js App Router + React + TypeScript**, giữ giao diện, tài nguyên và các tương tác đã chốt. Bản hiện tại build thành website tĩnh, phù hợp với GitHub → Vercel và các host phục vụ HTML/CSS/JS.

## Chạy trên máy

Dùng Node.js 24 LTS (xem `.nvmrc`; yêu cầu tối thiểu của dự án là Node 22).

```bash
npm ci
npm run dev
```

Mở http://localhost:3000. Để kiểm tra bản production:

```bash
npm run check
npm run preview
```

`check` chạy test vòng đời hiệu ứng, kiểm tra TypeScript rồi build. `preview` phục vụ thư mục `out/`; cần build trước. `npm run format:check` kiểm tra định dạng; `npm run format` chuẩn hóa định dạng.

## Nơi chỉnh sửa

| Đường dẫn                                       | Nội dung                                                        |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `src/app/layout.tsx`                            | Layout chung, header/footer/dialog, metadata                    |
| `src/app/page.tsx`                              | Thứ tự các section của trang chủ                                |
| `src/components/layout/`                        | Header, footer, nút liên hệ cố định                             |
| `src/components/home/`                          | Hero, Selected Work, ba tiêu đề, Studio, Services, Contact, FAQ |
| `src/components/overlays/`                      | Menu, cửa sổ dự án, lựa chọn Messenger/Zalo                     |
| `src/components/motion/`                        | Điểm khởi tạo tương tác phía trình duyệt                        |
| `src/content/projects.ts`                       | Nội dung, ảnh và mô tả các dự án mẫu                            |
| `src/content/services.ts`, `src/content/faq.ts` | Dịch vụ và câu hỏi thường gặp                                   |
| `src/config/site.ts`                            | Tên trang, menu, social, Messenger/Zalo                         |
| `src/lib/motion/`                               | Các hiệu ứng riêng theo chức năng và cơ chế dọn tài nguyên      |
| `src/styles/main.css`                           | CSS gốc giữ thứ tự cascade của thiết kế đã chốt                 |
| `public/assets/images/`, `public/assets/fonts/` | Ảnh, SVG và font cục bộ                                         |
| `tests/`                                        | Test độc lập bằng Node.js                                       |
| `docs/`                                         | Kiến trúc và hướng dẫn cập nhật GitHub/Vercel                   |

`out/`, `.next/` và `node_modules/` được tạo tự động, không sửa hoặc commit. Không còn dùng `dist/index.html`, `public/index.html` hay script `main.js` thủ công. Build tự đóng gói và đặt tên CSS/JS có hash.

## Deploy Vercel

Đọc [docs/DEPLOY.md](docs/DEPLOY.md), đặc biệt nếu cập nhật repo đang deploy bản HTML cũ.

- Framework: **Next.js**.
- Root Directory: thư mục chứa `package.json` của bản mới.
- Install Command: `npm ci`.
- Build Command: `npm run build`.
- Output Directory: `out`.
- Node.js: **24.x**.

`vercel.json` đã khai báo các thiết lập build trên. Cần bỏ những override cũ trỏ về `public` hoặc `dist` trong dashboard Vercel.

## Domain và mở rộng

Có thể đặt `NEXT_PUBLIC_SITE_URL=https://ten-mien-cua-ban` trong Vercel hoặc `.env.local` để bật canonical URL. Để trống khi chưa chốt domain. Đây là giá trị công khai lúc build; không đặt khóa API trong biến `NEXT_PUBLIC_*`.

Hiện chưa có CMS, form, đăng nhập, thanh toán hoặc API backend. Contact tiếp tục dùng Messenger/Zalo. Dự án trong danh sách vẫn là concept mẫu; social hiện trỏ đến trang nền tảng và cần thay bằng profile thật.

Thêm trang chi tiết dự án có thể dùng `src/app/work/[slug]/page.tsx`, dữ liệu từ `projects.ts` và `generateStaticParams()`. Xem [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) để biết giới hạn chế độ tĩnh và cách mở rộng sang dịch vụ có server.
