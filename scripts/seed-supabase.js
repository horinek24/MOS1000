const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('❌ Error: DATABASE_URL environment variable is missing in .env.local!');
  process.exit(1);
}

async function seedDatabase() {
  console.log('🔌 Connecting to Supabase PostgreSQL database...');
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully to Supabase Database!');

    // 1. Create Tables
    console.log('🛠 Creating tables (categories, courses, orders, order_items)...');
    
    await client.query(`
      -- Categories Table
      CREATE TABLE IF NOT EXISTS public.categories (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Courses Table
      CREATE TABLE IF NOT EXISTS public.courses (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
        category_label TEXT,
        price NUMERIC NOT NULL DEFAULT 0,
        original_price NUMERIC DEFAULT 0,
        badge TEXT,
        badge_type TEXT,
        level TEXT NOT NULL,
        duration TEXT,
        lessons_count INTEGER DEFAULT 0,
        rating NUMERIC DEFAULT 5.0,
        reviews_count INTEGER DEFAULT 0,
        students_count INTEGER DEFAULT 0,
        image TEXT NOT NULL,
        desc_short TEXT,
        full_description TEXT,
        instructor_name TEXT,
        instructor_title TEXT,
        instructor_avatar TEXT,
        modules JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Orders Table
      CREATE TABLE IF NOT EXISTS public.orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
        payment_status TEXT NOT NULL DEFAULT 'pending',
        total_amount NUMERIC NOT NULL DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Order Items Table
      CREATE TABLE IF NOT EXISTS public.order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
        course_id TEXT REFERENCES public.courses(id) ON DELETE SET NULL,
        course_title TEXT NOT NULL,
        price NUMERIC NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      -- Ensure RLS is disabled as requested by user
      ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.order_items DISABLE ROW LEVEL SECURITY;
    `);

    console.log('✅ Tables created and RLS set to disabled!');

    // 2. Seed Categories
    console.log('🌱 Seeding Categories...');
    const categoriesData = [
      { id: 'word', name: 'Khóa học Word', slug: 'word', description: 'Các khóa học Microsoft Word từ cơ bản đến nâng cao' },
      { id: 'excel', name: 'Khóa học Excel', slug: 'excel', description: 'Các khóa học Microsoft Excel từ cơ bản đến nâng cao' },
      { id: 'powerpoint', name: 'Khóa học PowerPoint', slug: 'powerpoint', description: 'Các khóa học Microsoft PowerPoint chuẩn quốc tế' },
      { id: 'mos2019', name: 'Khóa MOS 2019', slug: 'mos2019', description: 'Luyện thi chứng chỉ MOS 2019 trọn bộ 3 môn' },
      { id: 'mos365', name: 'Khóa MOS 365', slug: 'mos365', description: 'Luyện thi chứng chỉ MOS 365 trọn bộ mới nhất' },
    ];

    for (const cat of categoriesData) {
      await client.query(`
        INSERT INTO public.categories (id, name, slug, description)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          slug = EXCLUDED.slug,
          description = EXCLUDED.description;
      `, [cat.id, cat.name, cat.slug, cat.description]);
    }
    console.log(`✅ Seeded ${categoriesData.length} categories!`);

    // 3. Seed Courses
    console.log('🌱 Seeding 13 Courses...');
    const coursesData = [
      {
        id: 'word-co-ban',
        title: 'Khóa học Word Cơ Bản',
        slug: 'word-co-ban',
        category_id: 'word',
        category_label: 'Khóa học Word',
        price: 490000,
        original_price: 850000,
        badge: 'Bán chạy',
        badge_type: 'hot',
        level: 'Cơ bản',
        duration: '15 Giờ học',
        lessons_count: 32,
        rating: 4.9,
        reviews_count: 342,
        students_count: 1250,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-co-ban.jpg',
        desc_short: 'Khóa học Word Cơ Bản giúp bạn làm chủ toàn bộ kỹ năng soạn thảo văn bản từ con số 0.',
        full_description: 'Khóa học Word Cơ Bản giúp học viên làm chủ toàn bộ kỹ năng soạn thảo văn bản chuyên nghiệp theo chuẩn quốc tế Microsoft. Bạn sẽ nắm vững định dạng trang, kiểu chữ, canh lề, làm việc với bảng biểu và thao tác nâng cao hiệu suất làm việc.',
        instructor_name: 'ThS. Nguyễn Văn Minh',
        instructor_title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: [
          {
            id: 'mod-w1',
            title: 'Chương 1: Tổng quan giao diện & Quản lý Tài liệu',
            lessons: [
              { id: 'lw-1', title: '1.1 Tổng quan giao diện Word và thanh công cụ Ribbon', duration: '12:45', isPreview: true },
              { id: 'lw-2', title: '1.2 Tạo, lưu và thiết lập tùy chọn bảo mật văn bản', duration: '18:20', isPreview: true },
              { id: 'lw-3', title: '1.3 Định dạng trang, lề và Watermark', duration: '15:10' }
            ]
          },
          {
            id: 'mod-w2',
            title: 'Chương 2: Định dạng Văn bản & Đoạn văn chuyên nghiệp',
            lessons: [
              { id: 'lw-4', title: '2.1 Sử dụng Styles, Indents và Line Spacing', duration: '22:15', fileUrl: '#', fileName: 'BaiTap_Module2_Word.docx' },
              { id: 'lw-5', title: '2.2 Tìm kiếm & Thay thế nâng cao (Find & Replace)', duration: '16:40' },
              { id: 'lw-6', title: '2.3 Định dạng danh sách Bullets & Numbering tự động', duration: '14:30' }
            ]
          }
        ]
      },
      {
        id: 'word-nang-cao',
        title: 'Khóa học Word Nâng Cao',
        slug: 'word-nang-cao',
        category_id: 'word',
        category_label: 'Khóa học Word',
        price: 550000,
        original_price: 890000,
        badge: 'Nâng cao',
        badge_type: 'hot',
        level: 'Nâng cao',
        duration: '18 Giờ học',
        lessons_count: 35,
        rating: 4.9,
        reviews_count: 280,
        students_count: 980,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao.jpg',
        desc_short: 'Khóa học Word Nâng Cao với kỹ năng quản lý mẫu template, trộn thư Mail Merge và bảo mật văn bản.',
        full_description: 'Khóa học thiết kế riêng cho người đi làm và sinh viên năm cuối cần soạn thảo các báo cáo tài chính, luận văn, hợp đồng lớn với định dạng tự động hóa 100%.',
        instructor_name: 'ThS. Nguyễn Văn Minh',
        instructor_title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'word-nang-cao-2',
        title: 'Khóa học Word Nâng Cao 2',
        slug: 'word-nang-cao-2',
        category_id: 'word',
        category_label: 'Khóa học Word',
        price: 580000,
        original_price: 920000,
        badge: 'Nâng cao',
        badge_type: 'new',
        level: 'Nâng cao',
        duration: '20 Giờ học',
        lessons_count: 38,
        rating: 5.0,
        reviews_count: 215,
        students_count: 860,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-nang-cao-2.jpg',
        desc_short: 'Khóa học Word Nâng Cao 2 bứt phá kỹ năng xử lý mục lục tự động, chỉ mục Index và trích dẫn báo cáo khoa học.',
        full_description: 'Khóa học chuyên sâu giúp học viên hoàn thiện bộ kỹ năng xử lý văn bản quy mô lớn phức tạp.',
        instructor_name: 'ThS. Nguyễn Văn Minh',
        instructor_title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'word-mo-rong',
        title: 'Khóa học Word Mở Rộng',
        slug: 'word-mo-rong',
        category_id: 'word',
        category_label: 'Khóa học Word',
        price: 480000,
        original_price: 750000,
        badge: 'Mở rộng',
        badge_type: 'sale',
        level: 'Mở rộng',
        duration: '14 Giờ học',
        lessons_count: 28,
        rating: 4.8,
        reviews_count: 160,
        students_count: 720,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-word/word-mo-rong.jpg',
        desc_short: 'Khóa học Word Mở Rộng tổng hợp 50+ bộ tài liệu mẫu và dự án soạn thảo thực tế của doanh nghiệp.',
        full_description: 'Rèn luyện kỹ năng giải quyết công việc thực tế mở rộng song song với bài thi chứng chỉ tin học.',
        instructor_name: 'ThS. Nguyễn Văn Minh',
        instructor_title: 'Chuyên gia Giảng dạy Tin học Văn phòng',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'excel-co-ban',
        title: 'Khóa học Excel Cơ Bản',
        slug: 'excel-co-ban',
        category_id: 'excel',
        category_label: 'Khóa học Excel',
        price: 490000,
        original_price: 790000,
        badge: 'Nền tảng',
        badge_type: 'sale',
        level: 'Cơ bản',
        duration: '14 Giờ học',
        lessons_count: 28,
        rating: 4.9,
        reviews_count: 310,
        students_count: 1420,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-co-ban.jpg',
        desc_short: 'Khóa học Excel Cơ Bản lấy lại căn bản từ con số 0. Thành thạo phím tắt, nhập liệu và xử lý bảng tính.',
        full_description: 'Dành riêng cho những ai sợ Excel hoặc chưa từng tiếp xúc với máy tính. Giáo trình vô cùng trực quan dễ hiểu.',
        instructor_name: 'TS. Trần Hoàng Nam',
        instructor_title: 'Chuyên gia Phân tích Dữ liệu',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'excel-nang-cao',
        title: 'Khóa học Excel Nâng Cao',
        slug: 'excel-nang-cao',
        category_id: 'excel',
        category_label: 'Khóa học Excel',
        price: 520000,
        original_price: 890000,
        badge: 'Khuyên dùng',
        badge_type: 'hot',
        level: 'Nâng cao',
        duration: '18 Giờ học',
        lessons_count: 38,
        rating: 5.0,
        reviews_count: 418,
        students_count: 1680,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao.jpg',
        desc_short: 'Khóa học Excel Nâng Cao nắm chắc hàm, công thức, biểu đồ và kỹ năng quản lý bảng tính quy mô lớn.',
        full_description: 'Khóa học giúp bạn nắm vững toàn bộ các kỹ năng Excel từ quản lý ô bảng tính, định dạng điều kiện, các hàm xử lý chuỗi - logic - dò tìm đến vẽ biểu đồ chuẩn chỉnh.',
        instructor_name: 'TS. Trần Hoàng Nam',
        instructor_title: 'Chuyên gia Phân tích Dữ liệu',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: [
          {
            id: 'mod-e1',
            title: 'Chương 1: Quản lý Trang tính (Worksheet) & Vùng Dữ liệu',
            lessons: [
              { id: 'le-1', title: '1.1 Tổng quan giao diện Excel & Thao tác vùng dữ liệu', duration: '14:10', isPreview: true },
              { id: 'le-2', title: '1.2 Nhập dữ liệu, di chuyển, định dạng Cell Format & Number Format', duration: '20:30' }
            ]
          },
          {
            id: 'mod-e2',
            title: 'Chương 2: Làm chủ Công thức & Hàm (Formulas & Functions)',
            lessons: [
              { id: 'le-3', title: '2.1 Nhóm hàm tính toán: SUM, AVERAGE, COUNT, MAX, MIN', duration: '24:00', fileUrl: '#', fileName: 'Ham_Excel_CoBan.xlsx' },
              { id: 'le-4', title: '2.2 Nhóm hàm Logic & Chuỗi: IF, AND, OR, CONCAT, LEFT, RIGHT', duration: '28:15' },
              { id: 'le-5', title: '2.3 Nhóm hàm dò tìm: VLOOKUP, HLOOKUP và XLOOKUP', duration: '32:00', fileUrl: '#', fileName: 'Ham_DoTim_Advanced.xlsx' }
            ]
          }
        ]
      },
      {
        id: 'excel-nang-cao-2',
        title: 'Khóa học Excel Nâng Cao 2',
        slug: 'excel-nang-cao-2',
        category_id: 'excel',
        category_label: 'Khóa học Excel',
        price: 580000,
        original_price: 950000,
        badge: 'Chuyên sâu',
        badge_type: 'hot',
        level: 'Nâng cao',
        duration: '20 Giờ học',
        lessons_count: 36,
        rating: 5.0,
        reviews_count: 340,
        students_count: 1250,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-nang-cao-2.jpg',
        desc_short: 'Khóa học Excel Nâng Cao 2 làm chủ PivotTable, Slicer, Dashboard phân tích doanh thu và tự động hóa Macro.',
        full_description: 'Làm chủ các công cụ nâng cao của Microsoft Excel để tự tay thiết kế báo cáo tài chính kinh doanh tự động.',
        instructor_name: 'TS. Trần Hoàng Nam',
        instructor_title: 'Chuyên gia Phân tích Dữ liệu',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'excel-mo-rong',
        title: 'Khóa học Excel Mở Rộng',
        slug: 'excel-mo-rong',
        category_id: 'excel',
        category_label: 'Khóa học Excel',
        price: 620000,
        original_price: 990000,
        badge: 'Mở rộng',
        badge_type: 'new',
        level: 'Mở rộng',
        duration: '22 Giờ học',
        lessons_count: 40,
        rating: 5.0,
        reviews_count: 290,
        students_count: 1120,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-excel/excel-mo-rong.jpg',
        desc_short: 'Khóa học Excel Mở Rộng làm chủ Power Query, Power Pivot, xử lý dữ liệu Big Data và trực quan báo cáo.',
        full_description: 'Kỹ năng mở rộng phân tích dữ liệu đa chiều quy mô doanh nghiệp.',
        instructor_name: 'TS. Trần Hoàng Nam',
        instructor_title: 'Chuyên gia Phân tích Dữ liệu',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'powerpoint-co-ban',
        title: 'Khóa học PowerPoint Cơ Bản',
        slug: 'powerpoint-co-ban',
        category_id: 'powerpoint',
        category_label: 'Khóa học PowerPoint',
        price: 390000,
        original_price: 650000,
        badge: 'Nền tảng',
        badge_type: 'sale',
        level: 'Cơ bản',
        duration: '10 Giờ học',
        lessons_count: 20,
        rating: 4.8,
        reviews_count: 150,
        students_count: 710,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-co-ban.jpg',
        desc_short: 'Khóa học PowerPoint Cơ Bản học thiết kế slide đẹp mắt, bố cục cân đối và làm chủ công cụ trình chiếu.',
        full_description: 'Cung cấp nền tảng vững chắc cho sinh viên báo cáo môn học và nhân viên văn phòng thiết kế bài thuyết trình.',
        instructor_name: 'ThS. Lê Thùy Trang',
        instructor_title: 'Chuyên gia Thiết kế Slide',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'powerpoint-nang-cao',
        title: 'Khóa học PowerPoint Nâng Cao',
        slug: 'powerpoint-nang-cao',
        category_id: 'powerpoint',
        category_label: 'Khóa học PowerPoint',
        price: 450000,
        original_price: 790000,
        badge: 'Nâng cao',
        badge_type: 'new',
        level: 'Nâng cao',
        duration: '12 Giờ học',
        lessons_count: 26,
        rating: 4.8,
        reviews_count: 198,
        students_count: 890,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-nang-cao.jpg',
        desc_short: 'Khóa học PowerPoint Nâng Cao hướng dẫn tạo bài thuyết trình chuyên nghiệp, hiệu ứng chuyển slide & animation.',
        full_description: 'Khóa học PowerPoint nâng cao giúp bạn thiết kế những slide thuyết trình hiện đại, ấn tượng. Học cách làm việc với Slide Master, nhúng video, audio, bảng biểu, sơ đồ SmartArt và hiệu ứng Morph.',
        instructor_name: 'ThS. Lê Thùy Trang',
        instructor_title: 'Chuyên gia Thiết kế Slide',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'powerpoint-mo-rong',
        title: 'Khóa học PowerPoint Mở Rộng',
        slug: 'powerpoint-mo-rong',
        category_id: 'powerpoint',
        category_label: 'Khóa học PowerPoint',
        price: 490000,
        original_price: 820000,
        badge: 'Mở rộng',
        badge_type: 'hot',
        level: 'Mở rộng',
        duration: '14 Giờ học',
        lessons_count: 28,
        rating: 4.9,
        reviews_count: 175,
        students_count: 830,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-powerpoint/powerpoint-mo-rong.jpg',
        desc_short: 'Khóa học PowerPoint Mở Rộng bí kíp biến slide phẳng thành video chuyển động 3D nghệ thuật đỉnh cao.',
        full_description: 'Tận dụng toàn bộ sức mạnh của Morph Transition, Trigger Animation và nhúng video tương tác.',
        instructor_name: 'ThS. Lê Thùy Trang',
        instructor_title: 'Chuyên gia Thiết kế Slide',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'mos-2019',
        title: 'Khóa học MOS 2019',
        slug: 'mos-2019',
        category_id: 'mos2019',
        category_label: 'Khóa MOS 2019',
        price: 990000,
        original_price: 2530000,
        badge: 'MOS 2019',
        badge_type: 'sale',
        level: 'Mọi cấp độ',
        duration: '45 Giờ học',
        lessons_count: 96,
        rating: 5.0,
        reviews_count: 610,
        students_count: 3100,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-2019/MOS-2019.jpg',
        desc_short: 'Khóa học MOS 2019 trọn bộ 3 chứng chỉ Word, Excel và PowerPoint 2019 chuẩn quốc tế.',
        full_description: 'Gói Luyện thi chứng chỉ MOS 2019 giúp bạn tiết kiệm chi phí tối đa và sở hữu ngay cả 3 chứng chỉ tin học văn phòng quốc tế có giá trị trọn đời.',
        instructor_name: 'Đội ngũ Giảng viên MOS Master',
        instructor_title: 'Certiport Master Instructors Team',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      },
      {
        id: 'mos-365',
        title: 'Khóa học MOS 365',
        slug: 'mos-365',
        category_id: 'mos365',
        category_label: 'Khóa MOS 365',
        price: 1090000,
        original_price: 2800000,
        badge: 'MOS 365',
        badge_type: 'new',
        level: 'Mọi cấp độ',
        duration: '48 Giờ học',
        lessons_count: 102,
        rating: 5.0,
        reviews_count: 420,
        students_count: 2150,
        image: '/MOS1000_Assets/assets/images/products/khoa-hoc-mos-365/MOS-365.jpg',
        desc_short: 'Khóa học MOS 365 trọn bộ Microsoft 365 Apps for Enterprise mới nhất bám sát xu hướng công nghệ.',
        full_description: 'Cập nhật những tính năng mới nhất của Microsoft 365 Apps for Enterprise và quy trình thi trực tuyến.',
        instructor_name: 'Đội ngũ Giảng viên MOS Master',
        instructor_title: 'Certiport Master Instructors Team',
        instructor_avatar: '/MOS1000_Assets/assets/images/logo/logo-MOS1000.png',
        modules: []
      }
    ];

    for (const c of coursesData) {
      await client.query(`
        INSERT INTO public.courses (
          id, title, slug, category_id, category_label, price, original_price,
          badge, badge_type, level, duration, lessons_count, rating, reviews_count,
          students_count, image, desc_short, full_description, instructor_name,
          instructor_title, instructor_avatar, modules
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          slug = EXCLUDED.slug,
          category_id = EXCLUDED.category_id,
          category_label = EXCLUDED.category_label,
          price = EXCLUDED.price,
          original_price = EXCLUDED.original_price,
          badge = EXCLUDED.badge,
          badge_type = EXCLUDED.badge_type,
          level = EXCLUDED.level,
          duration = EXCLUDED.duration,
          lessons_count = EXCLUDED.lessons_count,
          rating = EXCLUDED.rating,
          reviews_count = EXCLUDED.reviews_count,
          students_count = EXCLUDED.students_count,
          image = EXCLUDED.image,
          desc_short = EXCLUDED.desc_short,
          full_description = EXCLUDED.full_description,
          instructor_name = EXCLUDED.instructor_name,
          instructor_title = EXCLUDED.instructor_title,
          instructor_avatar = EXCLUDED.instructor_avatar,
          modules = EXCLUDED.modules;
      `, [
        c.id, c.title, c.slug, c.category_id, c.category_label, c.price, c.original_price,
        c.badge, c.badge_type, c.level, c.duration, c.lessons_count, c.rating, c.reviews_count,
        c.students_count, c.image, c.desc_short, c.full_description, c.instructor_name,
        c.instructor_title, c.instructor_avatar, JSON.stringify(c.modules)
      ]);
    }
    console.log(`✅ Seeded ${coursesData.length} courses!`);

    // 4. Verify Counts
    const catCount = await client.query('SELECT COUNT(*) FROM public.categories;');
    const courseCount = await client.query('SELECT COUNT(*) FROM public.courses;');
    const ordersCount = await client.query('SELECT COUNT(*) FROM public.orders;');

    console.log('\n📊 DATABASE SUMMARY:');
    console.log(` - Categories: ${catCount.rows[0].count}`);
    console.log(` - Courses:    ${courseCount.rows[0].count}`);
    console.log(` - Orders:     ${ordersCount.rows[0].count}`);
    console.log('\n🎉 ALL TABLES CREATED AND SEEDED SUCCESSFULLY IN SUPABASE!');

  } catch (err) {
    console.error('❌ Migration Error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedDatabase();
