import { PrismaClient, Prisma } from "../lib/generated/prisma";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const d = (v: string): Prisma.Decimal => new Prisma.Decimal(v);

async function main() {
  // 1. 판매자 계정 생성
  const seller = await prisma.users.upsert({
    where: { email: "seller@tembus.com" },
    update: {},
    create: {
      id: randomUUID(),
      email: "seller@tembus.com",
      name: "템버스 판매자",
      role: "seller",
      verified: true,
      seller: {
        create: {
          id: randomUUID(),
          storeName: "템버스 스토어",
          slug: "tembus-store",
          storeDescription: "디지털 제품 전문 스토어",
          logo_url: "https://example.com/store-logo.png",
          verified: true,
          status: "active"
        }
      }
    },
    include: {
      seller: true
    }
  });

  // 2. 카테고리 생성
  const categoriesData: Prisma.categoriesCreateManyInput[] = [
    { id: 1, name: "디자인", slug: "design", description: "UI/UX, 그래픽 디자인 템플릿", icon: "🎨" },
    { id: 2, name: "개발", slug: "development", description: "코드, 플러그인, 개발 도구", icon: "💻" },
    { id: 3, name: "교육", slug: "education", description: "온라인 강좌, 튜토리얼", icon: "📚" },
    { id: 4, name: "3D/AR", slug: "3d-ar", description: "3D 모델, AR 에셋", icon: "🎮" },
    { id: 5, name: "음악", slug: "music", description: "음원, 사운드 에셋", icon: "🎵" }
  ];

  await prisma.categories.createMany({ data: categoriesData, skipDuplicates: true });

  // 3. 상품 생성
  const productsData: Prisma.ProductCreateInput[] = [
    {
      name: "프리미엄 UI 키트",
      shortDescription: "모던한 디자인의 UI 컴포넌트 모음",
      description: "Figma용 프리미엄 UI 키트입니다. 400+ 컴포넌트, 다크모드 지원.",
      price: d("99000"),
      type: "digital",
      status: "published",
      stock_quantity: 999,
      image_url: "https://example.com/ui-kit.png",
      digital_file_url: "https://example.com/downloads/ui-kit.fig",
      download_url: "https://example.com/downloads/ui-kit.fig",
      file_size: "24MB",
      featured: true,
      tags: ["ui", "design", "figma", "components"],
      rating: d("4.8"),
      review_count: 128,
      sales_count: 1500,
      categories: { connect: { id: 1 } },
      seller: { connect: { id: seller.seller!.id } },
      product_images: {
        create: [
          {
            image_url: "https://example.com/ui-kit-1.png",
            alt_text: "UI 키트 메인 이미지",
            is_primary: true
          },
          {
            image_url: "https://example.com/ui-kit-2.png",
            alt_text: "UI 키트 상세 이미지"
          }
        ]
      }
    },
    {
      name: "React Native 마스터 클래스",
      shortDescription: "제로부터 앱 출시까지",
      description: "React Native로 크로스플랫폼 앱을 개발하는 방법을 배웁니다.",
      price: d("149000"),
      type: "digital",
      status: "published",
      stock_quantity: 999,
      image_url: "https://example.com/rn-course.png",
      digital_file_url: "https://example.com/courses/rn-master.zip",
      download_url: "https://example.com/courses/rn-master.zip",
      file_size: "2.1GB",
      featured: true,
      tags: ["react-native", "mobile", "development", "course"],
      rating: d("4.9"),
      review_count: 256,
      sales_count: 2100,
      categories: { connect: { id: 2 } },
      seller: { connect: { id: seller.seller!.id } },
      product_images: {
        create: [
          {
            image_url: "https://example.com/rn-course-1.png",
            alt_text: "강좌 커버 이미지",
            is_primary: true
          }
        ]
      }
    }
  ];

  for (const productData of productsData) {
    await prisma.product.create({ data: productData });
  }

  console.log("✅ 시드 데이터 생성 완료");
}

main()
  .catch((e) => {
    console.error("시드 데이터 생성 실패:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });