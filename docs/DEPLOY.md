# Cập nhật GitHub → Vercel

Repo và project Vercel hiện tại có thể giữ nguyên. Bản này chuyển từ HTML tĩnh thủ công sang nguồn Next.js, nên lần cập nhật đầu cần thay bộ source và sửa cấu hình deploy cũ.

## Lần chuyển cấu trúc này

1. Giải nén gói mới. Thư mục dự án phải chứa trực tiếp `package.json`, `src`, `public`, `next.config.ts` và `vercel.json`.
2. Trong working copy repo của bạn, giữ thư mục `.git` và các file cấu hình riêng do bạn quản lý. Thay source cũ bằng toàn bộ source mới, bao gồm `.gitignore`, `.env.example`, `.nvmrc` và `package-lock.json`.
3. Xóa các file thuộc website cũ nếu còn sót: `dist/`, `public/index.html`, `public/assets/css/`, `public/assets/js/`, `index.html`, các CSS/JS patch ở root và các script serve/check cũ. Chỉ xóa những file đã được thay thế; giữ ảnh/nội dung/config riêng của bạn nếu có thay đổi sau gói trước.
4. Nếu bạn đã sửa dự án, social hoặc link liên hệ trong repo, đưa các sửa đổi đó vào `src/content/` và `src/config/site.ts` của bản mới.
5. Chạy `npm ci`, `npm run check`, `npm run preview` để kiểm tra trước khi push.
6. Trong Vercel → Project → Settings → Build and Deployment, chọn Next.js, đúng Root Directory, Node 24.x. Bản mới cố định **Output Directory `.next`** trong `vercel.json`, dùng install `npm ci` và build `npm run build`. Nếu dashboard đang bật Override, đổi giá trị sang `.next` rồi Save; không nhập `out`, `public` hoặc `dist`.
7. Commit và push. Vercel sẽ build và deploy commit mới; kiểm tra build log và Preview Deployment trước khi đưa lên production nếu dùng branch preview.

Với GitHub web UI, tải source mới lên vẫn cần xóa file cũ riêng: thao tác upload không tự xóa các file đã không còn trong gói.

## Những lần cập nhật sau

Chỉ sửa file nguồn cần thiết → kiểm tra → commit → push. Vercel tự build lại. Không upload `out`, `.next`, `node_modules` hoặc `.env.local` lên GitHub.

Không cần tạo lại repo mỗi lần. Có thể dùng một branch riêng cho lần chuyển cấu trúc, kiểm tra Preview Deployment rồi merge vào production branch đang cấu hình trên Vercel. Nếu cần quay lại, dùng deployment trước trong Vercel hoặc revert commit trong Git.

## Domain và secrets

`NEXT_PUBLIC_SITE_URL` là tùy chọn, dùng domain production cuối cùng để tạo canonical. Thay biến này cần redeploy. Những secret cho dịch vụ tương lai phải đặt trong Environment Variables phía server, không đưa vào source hoặc biến `NEXT_PUBLIC_*`.

## Sửa lỗi thiếu routes-manifest.json

Nếu log báo `/vercel/path0/out/routes-manifest.json` không tồn tại trong khi `next build` đã thành công:

1. Đặt `vercel.json` cạnh `package.json`, giữ `framework: "nextjs"` và khai báo `outputDirectory: ".next"`.
2. Vercel → Project → Settings → Build and Deployment → Framework Settings: giữ **Next.js**. Nếu Output Directory đang bật Override, đổi sang `.next` và Save. Cấu hình `outputDirectory` trong `vercel.json` được ưu tiên hơn cài đặt dashboard.
3. Giữ Root Directory trỏ đến thư mục chứa `package.json`, install `npm ci`, build `npm run build`, Node `24.x`.
4. Push commit đã sửa và deploy commit mới. Nếu redeploy thủ công, chọn đúng commit mới; có thể tắt dùng build cache để kiểm tra sạch.

Không tự tạo hoặc chép `routes-manifest.json` vào `out`. Đây là manifest nội bộ trong `.next/`; adapter Next.js của Vercel đọc manifest từ `.next/` rồi xử lý thư mục static export `out/`. Thông báo telemetry là thông tin; cảnh báo Node range được xử lý bằng `engines.node: "24.x"`.

Nếu log vẫn tìm `/out/routes-manifest.json` sau khi sửa, kiểm tra **Source Commit** của deployment và Root Directory: commit đó phải có `vercel.json` mới cạnh `package.json` trong thư mục được build. Không chỉ bấm Redeploy ở lần deploy cũ.
