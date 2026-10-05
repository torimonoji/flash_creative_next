# Cập nhật GitHub → Vercel

Repo và project Vercel hiện tại có thể giữ nguyên. Bản này chuyển từ HTML tĩnh thủ công sang nguồn Next.js, nên lần cập nhật đầu cần thay bộ source và sửa cấu hình deploy cũ.

## Lần chuyển cấu trúc này

1. Giải nén gói mới. Thư mục dự án phải chứa trực tiếp `package.json`, `src`, `public`, `next.config.ts` và `vercel.json`.
2. Trong working copy repo của bạn, giữ thư mục `.git` và các file cấu hình riêng do bạn quản lý. Thay source cũ bằng toàn bộ source mới, bao gồm `.gitignore`, `.env.example`, `.nvmrc` và `package-lock.json`.
3. Xóa các file thuộc website cũ nếu còn sót: `dist/`, `public/index.html`, `public/assets/css/`, `public/assets/js/`, `index.html`, các CSS/JS patch ở root và các script serve/check cũ. Chỉ xóa những file đã được thay thế; giữ ảnh/nội dung/config riêng của bạn nếu có thay đổi sau gói trước.
4. Nếu bạn đã sửa dự án, social hoặc link liên hệ trong repo, đưa các sửa đổi đó vào `src/content/` và `src/config/site.ts` của bản mới.
5. Chạy `npm ci`, `npm run check`, `npm run preview` để kiểm tra trước khi push.
6. Trong Vercel → Project → Settings → Build and Deployment, chọn Next.js, đúng Root Directory, Node 24.x. Xóa override cũ dùng `public`/`dist`; bản mới dùng install `npm ci`, build `npm run build`, output `out` theo `vercel.json`.
7. Commit và push. Vercel sẽ build và deploy commit mới; kiểm tra build log và Preview Deployment trước khi đưa lên production nếu dùng branch preview.

Với GitHub web UI, tải source mới lên vẫn cần xóa file cũ riêng: thao tác upload không tự xóa các file đã không còn trong gói.

## Những lần cập nhật sau

Chỉ sửa file nguồn cần thiết → kiểm tra → commit → push. Vercel tự build lại. Không upload `out`, `.next`, `node_modules` hoặc `.env.local` lên GitHub.

Không cần tạo lại repo mỗi lần. Có thể dùng một branch riêng cho lần chuyển cấu trúc, kiểm tra Preview Deployment rồi merge vào production branch đang cấu hình trên Vercel. Nếu cần quay lại, dùng deployment trước trong Vercel hoặc revert commit trong Git.

## Domain và secrets

`NEXT_PUBLIC_SITE_URL` là tùy chọn, dùng domain production cuối cùng để tạo canonical. Thay biến này cần redeploy. Những secret cho dịch vụ tương lai phải đặt trong Environment Variables phía server, không đưa vào source hoặc biến `NEXT_PUBLIC_*`.
