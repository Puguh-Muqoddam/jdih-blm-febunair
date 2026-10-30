import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Shield,
  Eye,
  CheckCircle2,
  Users,
  MapPin,
  Mail,
  Building2,
  FileText,
  Award,
  Sparkles,
  Compass,
  Phone,
  Landmark,
  Search,
  MessageSquare,
  Briefcase,
  Layers,
  HeartHandshake,
  UserCheck,
  Check,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

function InstagramIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Tentang BLM FEB UNAIR | Parlemen Cakrasena 2026",
  description:
    "Profil lengkap Badan Legislatif Mahasiswa (BLM) FEB Universitas Airlangga Kabinet Cakrasena 2026: Visi & Misi, Tri-Fungsi Pokok, 8 Nilai Organisasi, Filosofi Lambang, Struktur KSB, Biro, Komisi, dan Departemen.",
};

export default function TentangPage() {
  // 1. Tiga Fungsi Pokok (Buku Panduan / Booklet BLM 2026)
  const coreFunctions = [
    {
      title: "Fungsi Pengawasan",
      code: "Komisi A",
      icon: Search,
      tag: "Pengawasan & Internal",
      desc: "Bertanggung jawab atas fungsi pengawasan terhadap Badan Eksekutif Mahasiswa (BEM) FEB Unair serta wadah bagi pengembangan internal anggota BLM.",
    },
    {
      title: "Fungsi Legislasi",
      code: "Komisi B",
      icon: FileText,
      tag: "Legislasi & Eksternal",
      desc: "Menjalankan fungsi legislasi, mengusulkan dan merumuskan rancangan peraturan, menyelenggarakan Pemira, serta membangun relasi strategis eksternal ormawa.",
    },
    {
      title: "Fungsi Advokasi",
      code: "Komisi C",
      icon: MessageSquare,
      tag: "Advokasi & Informasi",
      desc: "Bertanggung jawab dalam pelaksanaan fungsi advokasi isu akademik dan fasilitas kampus serta pengelolaan publikasi informasi melalui media kelembagaan.",
    },
  ];

  // 2. Misi Resmi (Booklet BLM 2026 Hal. 3)
  const officialMissions = [
    "Menjalankan fungsi legislasi, pengawasan, aspirasi, dan advokasi secara profesional serta bertanggung jawab.",
    "Menjadi wadah utama aspirasi mahasiswa yang responsif dan progresif.",
    "Membangun hubungan kolaboratif dengan ORMAWA dan pihak fakultas melalui komunikasi dua arah, musyawarah, serta keterbukaan informasi.",
    "Mengoptimalkan media dan sarana digital sebagai pusat informasi, edukasi, dan penyaluran aspirasi yang mudah diakses.",
  ];

  // 3. Delapan Nilai Organisasi (Booklet BLM 2026 Hal. 7)
  const organizationValues = [
    { number: "01", name: "Profesionalisme", desc: "Bekerja dengan kompetensi, kedisiplinan, dan tanggung jawab penuh." },
    { number: "02", name: "Integritas", desc: "Menjunjung tinggi kejujuran moral dan etika dalam setiap tindakan." },
    { number: "03", name: "Transparansi", desc: "Keterbukaan informasi regulasi dan anggaran bagi seluruh mahasiswa." },
    { number: "04", name: "Akuntabilitas", desc: "Dapat dipertanggungjawabkan kepada sivitas akademika dan konstitusi." },
    { number: "05", name: "Demokrasi", desc: "Mengutamakan kedaulatan mahasiswa, musyawarah, dan keterbukaan gagasan." },
    { number: "06", name: "Keadilan", desc: "Menimbang setiap kebijakan secara objektif dan berpihak pada kebenaran." },
    { number: "07", name: "Independensi", desc: "Bebas dari intervensi yang merugikan kepentingan umum mahasiswa." },
    { number: "08", name: "Keberanian", desc: "Tegas bersuara dalam mengadvokasi hak dan mendorong perubahan positif." },
  ];

  // 4. Filosofi Lambang Cakrasena: Warna & Elemen (Booklet BLM 2026 Hal. 4-5)
  const logoColors = [
    {
      name: "NAVY",
      hex: "#0F294A",
      bgClass: "bg-[#0F294A]",
      textClass: "text-[#0F294A]",
      desc: "Melambangkan profesionalisme dan stabilitas dalam menjalankan tugas kelembagaan.",
    },
    {
      name: "GREY",
      hex: "#64748B",
      bgClass: "bg-[#64748B]",
      textClass: "text-[#64748B]",
      desc: "Merepresentasikan transparansi dan keterbukaan dalam setiap proses pengambilan keputusan.",
    },
    {
      name: "GOLD",
      hex: "#C59B27",
      bgClass: "bg-[#C59B27]",
      textClass: "text-[#b96d41]",
      desc: "Mencerminkan integritas serta komitmen untuk menjunjung nilai moral dan kehormatan organisasi.",
    },
  ];

  const logoElements = [
    {
      name: "NAGA",
      meaning: "Kekuatan & Keteguhan Penjaga Konstitusi",
      desc: "Melambangkan kekuatan penjaga konstitusi dan keadilan, serta keteguhan BLM dalam menjalankan fungsi legislasi dan pengawasan secara profesional dan berintegritas.",
    },
    {
      name: "TIMBANGAN",
      meaning: "Keadilan & Penegakan Regulasi",
      desc: "Melambangkan kekuatan penjaga konstitusi dan keadilan, serta keteguhan BLM dalam menjalankan fungsi legislasi dan pengawasan secara profesional dan berintegritas.",
    },
    {
      name: "PERISAI",
      meaning: "Benteng Perlindungan Mahasiswa",
      desc: "Melambangkan perlindungan hak mahasiswa dan tanggung jawab BLM sebagai benteng demokrasi kampus.",
    },
    {
      name: "TOMBAK",
      meaning: "Ketegasan & Dorongan Perubahan",
      desc: "Melambangkan ketegasan, keberanian bersuara, dan dorongan perubahan dalam fungsi advokasi dan pengawasan BLM.",
    },
    {
      name: "LINGKARAN",
      meaning: "Kesatuan & Sinergi Kampus",
      desc: "Melambangkan kesatuan, kesinambungan, dan sinergi antara mahasiswa, ORMAWA, dan fakultas dalam demokrasi kampus.",
    },
  ];

  // 5. Pimpinan Parlemen / KSB (Booklet BLM 2026 Hal. 10-11)
  const ksbLeaders = [
    {
      role: "KETUA UMUM",
      name: "Muhammad Rafly Siregar",
      desc: "Pimpinan yang menetapkan arahan strategis, menyusun Prosedur Operasional Standar (SOP), serta mengawasi program kerja dan kegiatan organisasi. Menjaga komunikasi dengan ormawa intrakampus FEB Unair, berwenang meminta informasi aktivitas organisasi, memberikan teguran, himbauan, serta arahan kepada anggota, dan melakukan evaluasi kinerja.",
    },
    {
      role: "SEKRETARIS JENDERAL",
      name: "Mariska Amelia Putri",
      desc: "Pimpinan yang bertanggung jawab atas administrasi dan kesekretariatan. Tugasnya meliputi koordinasi penetapan SOP bersama Ketua, menyusun proposal serta laporan dengan Koordinator Komisi, serta mengelola inventarisasi dan perawatan sekretariat. Berwenang memberi arahan administrasi dan mengambil keputusan terkoordinasi.",
    },
    {
      role: "BENDAHARA UMUM",
      name: "Nurul Aziziyah Chusnan",
      desc: "Bertanggung jawab atas keuangan organisasi dengan tugas menetapkan SOP keuangan bersama Ketua, menyusun anggaran dengan Koordinator Komisi, mengelola arus kas, serta membuat laporan keuangan triwulanan dan tahunan. Melaporkan posisi keuangan dalam sidang pleno serta berwenang mengambil keputusan keuangan.",
    },
  ];

  // 6. Biro Parlemen (Booklet BLM 2026 Hal. 12-14)
  const bureaus = [
    {
      name: "Biro Admin",
      leadTitle: "Kepala Biro Admin",
      leader: "Revalina Diah Oktaviani",
      parentRole: "Di bawah koordinasi Sekretaris Jenderal",
      desc: "Biro yang khusus menangani berbagai hal yang berkaitan dengan pelaksanaan dan pengontrolan tata tertib administrasi BLM FEB Unair, surat-menyurat, pembuatan notulensi, pembuatan proposal, memastikan LPJ atau progress report kegiatan masuk tepat waktu, serta mengoordinasi upaya menjadikan sekretariat BLM FEB Unair sebagai pusat kegiatan yang nyaman bagi pengurus dan pusat informasi kegiatan.",
      prokers: [
        { name: "Pengadaan Inventaris", detail: "Memberikan layanan pendataan inventaris." },
        { name: "Kalender Kabinet BLM", detail: "Menjadi pusat informasi seluruh jadwal kegiatan yang diselenggarakan oleh Kabinet BLM." },
        { name: "Temu Sekre", detail: "Biro ADM memberikan pendampingan kepada setiap sekretaris biro/komisi dalam menjalankan hal administrasi." },
        { name: "Evaluasi BLM", detail: "Biro Admin membuat laporan evaluasi kinerja seluruh anggota dan staff BLM selama satu periode." },
      ],
    },
    {
      name: "Biro Keuangan",
      leadTitle: "Kepala Biro Keuangan",
      leader: "Ribka Novechia",
      parentRole: "Di bawah koordinasi Bendahara Umum",
      desc: "Biro keuangan bertanggung jawab atas manajemen keuangan dan segala aspek keuangan yang terdapat dalam BLM FEB Unair. Bertugas untuk mengelola keuangan BLM FEB Unair secara efisien, membuat perencanaan keuangan dalam rencana jangka panjang dan pendek, serta menyusun laporan keuangan dan menyediakan informasi keuangan organisasi yang akurat serta relevan.",
      prokers: [
        { name: "BLM Tabungan", detail: "Menyediakan sumber pendanaan cadangan melalui sistem tabungan organisasi." },
        { name: "Staff Ahli Delegates", detail: "Menugaskan staf Bendahara Umum dan Biro Keuangan ke tiap komisi untuk mempermudah koordinasi dan mempercepat proses LPJ." },
        { name: "Drive Bendahara", detail: "Drive untuk menyimpan, mengelola, dan mempermudah akses dokumen keuangan dan administrasi BLM." },
        { name: "Restruksi Birokrasi", detail: "Inisiatif BLM dalam menyusun SOP pengelolaan dana dan LPJ yang terstruktur dan akuntabel." },
      ],
    },
  ];

  // 7. Tiga Komisi dan Departemen di Bawahnya (Booklet BLM 2026 Hal. 15-24)
  const commissions = [
    {
      code: "KOMISI A",
      name: "Komisi A",
      theme: "Pengawasan & Pengembangan Internal",
      leaders: [
        { title: "Ketua Komisi A", name: "Greicindy Astina Alfani Yovesari" },
      ],
      desc: "Komisi A dalam Badan Legislatif Mahasiswa (BLM) FEB Unair memiliki peran strategis dalam menjalankan fungsi pengawasan terhadap Badan Eksekutif Mahasiswa (BEM) FEB Unair. Komisi A juga menjadi wadah bagi pengembangan internal anggota BLM, memberikan ruang bagi peningkatan kapasitas serta pemahaman yang lebih mendalam terhadap fungsi legislatif mahasiswa.",
      departments: [
        {
          name: "Departemen Pengawasan",
          head: "Bintang Kharisma Lindra",
          desc: "Departemen yang bertugas untuk melakukan pengawasan terhadap kinerja BEM FEB agar berjalan semestinya, serta menjadi fasilitator forum antara ormawa yang ada di lingkup FEB.",
          prokers: [
            { name: "Pengawasan BEM FEB UNAIR", detail: "Melakukan pengawasan terhadap pelaksanaan seluruh program kerja BEM FEB Unair." },
            { name: "Forum BAWASHIM", detail: "Menjadi wadah diskusi dan pertukaran gagasan bagi BAWASHIM HIMA FEB Unair terkait isu dan permasalahan jurusan masing-masing." },
            { name: "Monitoring & Evaluasi (MONEV)", detail: "Melaksanakan penilaian kinerja BEM dan ormawa FEB dalam satu periode kepengurusan melalui laporan evaluatif setiap 3 bulan sekali." },
          ],
        },
        {
          name: "Departemen Pengembangan Internal",
          head: "Lintang Devitasari",
          desc: "Departemen yang bertanggung jawab atas pengembangan kapasitas, keterampilan, dan kebersamaan anggota BLM FEB Unair.",
          prokers: [
            { name: "Welcome Party", detail: "Kegiatan penyambutan staf baru BLM pasca pengumuman penerimaan staf." },
            { name: "Upgrading", detail: "Program penguatan internal BLM secara outdoor untuk meningkatkan keakraban dan pengembangan soft skills anggota." },
            { name: "Hearing", detail: "Wadah penyerapan aspirasi dan masukan dari anggota internal BLM." },
            { name: "INSPIRE (Internal Spirit)", detail: "Forum penguatan internal BLM dalam bentuk seminar dengan menghadirkan pengurus periode sebelumnya sebagai pembicara." },
            { name: "LEG-IN (Legislative Internship)", detail: "Program magang BLM bagi mahasiswa baru dan mahasiswa satu tingkat di atasnya selama setengah periode." },
            { name: "ACTION (Action for Continuous Improvement)", detail: "Evaluasi kinerja anggota BLM yang dilaksanakan setiap tiga bulan (triwulan)." },
            { name: "Farewell", detail: "Kegiatan demisioner anggota BLM yang dikoordinasikan oleh LEG-Fam di bawah pengawasan Departemen PI." },
          ],
        },
      ],
    },
    {
      code: "KOMISI B",
      name: "Komisi B",
      theme: "Legislatif & Hubungan Eksternal",
      leaders: [
        { title: "Ketua Komisi B", name: "Muhammad Nabil Ihsan" },
        { title: "Wakil Ketua Komisi B", name: "Muhammas Nafis" },
      ],
      desc: "Komisi yang bergerak di bidang legislatif dan eksternal. Berperan mengusulkan rancangan undang-undang yang berkaitan dengan ormawa intrakampus FEB Unair, membentuk panitia khusus untuk menyelenggarakan pemilihan umum (PEMIRA) untuk memilih Ketua BEM, anggota BLM, dan ketua HIMA di setiap Prodi FEB Unair, serta menambah insight ormawa secara eksternal.",
      departments: [
        {
          name: "Departemen Legislatif",
          head: "Puguh Muqoddam",
          desc: "Departemen yang bertanggung jawab atas fungsi legislasi di BLM FEB Unair. Berperan penting dalam menciptakan regulasi yang jelas dan transparan, serta memastikan bahwa kebijakan yang dibuat oleh BEM FEB Unair sesuai dengan aspirasi mahasiswa.",
          prokers: [
            { name: "Sinergi Ormawa", detail: "Forum legislasi tertinggi yang melibatkan seluruh perwakilan organisasi mahasiswa FEB UNAIR untuk membahas dan menetapkan Konstitusi Ormawa." },
            { name: "BLM Class", detail: "Program edukatif internal untuk membekali anggota BLM dengan pemahaman teknis persidangan, legislasi, pengawasan, dan advokasi." },
            { name: "Sidang AD/ART", detail: "Forum resmi untuk membahas dan menetapkan Anggaran Dasar dan Anggaran Rumah Tangga BLM FEB UNAIR." },
            { name: "Sidang Protap", detail: "Forum pembahasan dan penetapan Prosedur Tetap (Protap) bersama BEM sebagai acuan teknis dan operasional pengawasan." },
            { name: "Sidang Musma 1 & 2", detail: "Forum musyawarah yang membahas pertanggungjawaban KPUM, pengesahan BLM, dan pengesahan BEM FEB Unair." },
            { name: "Pemira", detail: "Proses pemilihan umum raya untuk menentukan Kahima, Presbem & Wapresbem, KSB BLM, dan Perwakilan DLM." },
            { name: "Sidang UU Pemira", detail: "Forum pembahasan dan penetapan UU Pemira sebagai aturan teknis penyelenggaraan Pemira FEB UNAIR." },
          ],
        },
        {
          name: "Departemen Hubungan Eksternal",
          head: "Zidhan Ramadhan Santoso",
          desc: "Departemen yang berperan penting dalam menambah insight ormawa secara representatif dengan eksternal sehingga dapat menjadi organisasi yang memiliki mutu lebih baik serta sebagai pionir citra organisasi.",
          prokers: [
            { name: "Parliamentary Learning Expedition (PARLETION)", detail: "Sinergitas antar Ormawa FEB UNAIR seputar teknik persidangan yang diakhiri kunjungan langsung ke DPRD Jawa Timur." },
            { name: "Political Case Competition (POLCASE)", detail: "Kompetisi berpikir kritis tingkat provinsi mengenai dinamika politik dalam dan luar negeri, ditutup dengan seminar kebangsaan." },
            { name: "Legislative Study Visit (LEGAVIS)", detail: "Program pembelajaran lapangan dengan berkunjung ke BLM Universitas di luar Jawa Timur dan instansi pemerintah/swasta." },
            { name: "House of Representative (H&R)", detail: "Penerimaan kunjungan anggota BLM dari universitas lain untuk meningkatkan wawasan dan kemajuan organisasi." },
          ],
        },
      ],
    },
    {
      code: "KOMISI C",
      name: "Komisi C",
      theme: "Aspirasi & Advokasi serta Medkominfo",
      leaders: [
        { title: "Ketua Komisi C", name: "Rian Miftahus Surur" },
      ],
      desc: "Komisi yang berfokus pada bidang Aspirasi dan Advokasi, serta Media dan Komunikasi Informasi (Medkominfo). Memiliki peran strategis dalam menampung dan mengelola aspirasi mahasiswa terkait isu akademik, kebijakan fakultas, serta permasalahan di lingkungan FEB Unair, serta bertanggung jawab dalam pengelolaan informasi melalui Departemen Medkominfo.",
      departments: [
        {
          name: "Departemen Aspirasi dan Advokasi",
          head: "Rayna Octobee Ramadhine Nugraha",
          desc: "Departemen yang bertanggung jawab menampung dan mengelola aspirasi mahasiswa terkait isu akademik, kebijakan fakultas, serta berbagai permasalahan yang terjadi di lingkungan Fakultas Ekonomi dan Bisnis Universitas Airlangga.",
          prokers: [
            { name: "Sosialisasi KRS", detail: "Sosialisasi teknis pengisian KRS bagi mahasiswa FEB Unair agar pelaksanaan berjalan tanpa kendala." },
            { name: "Pengaduan KRS", detail: "Layanan pengaduan dan pendampingan kendala pengisian KRS/KPRS yang langsung diteruskan ke pihak akademik." },
            { name: "Suara FEB", detail: "Penjaringan aspirasi online (G-Form) dan offline mengenai evaluasi fasilitas dan isu kampus." },
            { name: "Hi Dekanat", detail: "Forum tindak lanjut aspirasi mahasiswa bersama pimpinan Dekanat FEB Unair agar didengar secara langsung." },
            { name: "Ormawa Spirit", detail: "Wadah penjaringan aspirasi bagi seluruh ormawa di FEB Unair terkait pelaksanaan kegiatan keorganisasian." },
            { name: "Survei Semester Antara", detail: "Penjaringan kebutuhan mata kuliah mahasiswa FEB Unair untuk penyelenggaraan semester antara genap-ganjil." },
          ],
        },
        {
          name: "Departemen Medkominfo",
          head: "Regina Natania Kristanto",
          desc: "Departemen yang bertanggung jawab dalam pengelolaan informasi, publikasi, serta komunikasi kelembagaan BLM FEB Unair.",
          prokers: [
            { name: "BLM Monthly", detail: "Publikasi berkala rangkuman kegiatan dan kinerja BLM setiap bulannya melalui Instagram resmi." },
            { name: "PDH x ID CARD", detail: "Pengadaan atribut identitas resmi Pakaian Dinas Harian (PDH) dan kartu identitas fungsionaris BLM." },
            { name: "MEDPART", detail: "Kerjasama kemitraan media informasi dan publikasi bersama ormawa internal dan eksternal FEB." },
            { name: "Ultah BLM", detail: "Apresiasi ucapan hari lahir fungsionaris untuk mempererat kekeluargaan dan harmoni internal." },
            { name: "Rubrik", detail: "Peringkasan dan publikasi hasil rapat, risalah persidangan, serta informasi legislatif ke media sosial." },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1 py-8 sm:py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb Navigasi */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#4A5568]">
            <Link href="/" className="hover:text-[#1B67BC] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#1B67BC]" />
            <span className="font-semibold text-[#1A1A1A]">Tentang BLM FEB UNAIR</span>
          </nav>

          {/* ===================================================================
              1. HERO PROFIL & LOGO DUAL
             =================================================================== */}
          <section className="rounded-lg border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-white p-2 border border-[#A3D0EE] shadow-xs flex items-center justify-center">
                  <Image
                    src="/images/blm_logo.png"
                    alt="Logo Resmi BLM FEB UNAIR"
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg bg-white p-2 border border-[#A3D0EE] shadow-xs flex items-center justify-center">
                  <Image
                    src="/images/parliament_logo.png"
                    alt="Logo Parlemen Cakrasena"
                    width={100}
                    height={100}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="space-y-2.5 text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 rounded bg-[#0F294A] px-3 py-1 text-xs font-bold text-white tracking-wide">
                  <Landmark className="w-3.5 h-3.5 text-[#A3D0EE]" />
                  <span>KABINET CAKRASENA 2026</span>
                </div>
                <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] leading-tight">
                  Badan Legislatif Mahasiswa FEB UNAIR
                </h1>
                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed max-w-3xl">
                  Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga (BLM FEB Unair) berkedudukan sebagai lembaga tinggi mahasiswa yang berperan sebagai representasi mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga. Secara administratif, BLM FEB Unair berlokasi di Graha Krida Mahasiswa (GKM) lantai 1 Fakultas Ekonomi dan Bisnis Universitas Airlangga, beralamat di Jl. Airlangga No. 4–6, Surabaya.
                </p>
              </div>
            </div>

            {/* Kotak Ringkasan Peran Faktual dari Buku Panduan */}
            <div className="rounded-md border-l-4 border-[#1B67BC] bg-[#C6E8F7]/25 p-4 sm:p-5 text-xs sm:text-sm text-[#1A1A1A] leading-relaxed">
              <p className="font-medium">
                Dalam menjalankan perannya, BLM FEB Unair berlandaskan visi untuk mewujudkan lembaga representasi mahasiswa yang profesional, transparan, dan berintegritas dalam menjalankan fungsi legislasi, pengawasan, penyaluran aspirasi, dan advokasi demi kemaslahatan seluruh sivitas akademika FEB Universitas Airlangga.
              </p>
            </div>
          </section>

          {/* ===================================================================
              2. TIGA FUNGSI POKOK BLM FEB UNAIR
             =================================================================== */}
          <section className="space-y-5">
            <div className="space-y-1.5">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                Tugas Pokok & Tanggung Jawab
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Tiga Fungsi Pokok Parlemen
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Sebagai bentuk pelaksanaan tugas dan tanggung jawab kelembagaan, BLM FEB UNAIR memiliki tiga fungsi pokok yang dijalankan melalui tiga komisi:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {coreFunctions.map((fn) => {
                const IconComponent = fn.icon;
                return (
                  <div
                    key={fn.title}
                    className="rounded-lg border border-[#A3D0EE] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs bg-[#1B67BC] text-white px-2.5 py-1 rounded">
                          {fn.code}
                        </span>
                        <span className="text-[11px] font-semibold text-[#b96d41] bg-[#C6E8F7]/30 border border-[#A3D0EE] px-2 py-0.5 rounded">
                          {fn.tag}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                        {fn.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                        {fn.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ===================================================================
              3. VISI & MISI KABINET CAKRASENA
             =================================================================== */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Visi */}
            <div className="lg:col-span-5 rounded-lg bg-[#0F294A] text-white p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-5 border border-[#3885CC]/30">
              <div className="space-y-3.5">
                <span className="inline-block rounded bg-[#b96d41] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Visi Kabinet
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white leading-snug">
                  Visi BLM FEB UNAIR 2026
                </h3>
                <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                  &quot;Terwujudnya Badan Legislatif Mahasiswa Fakultas Ekonomi dan Bisnis Universitas Airlangga yang profesional, transparan, dan berintegritas sebagai lembaga representasi mahasiswa dalam menjalankan fungsi legislasi, pengawasan, aspirasi, dan advokasi.&quot;
                </p>
              </div>
              <div className="pt-4 border-t border-white/15 text-xs text-[#A3D0EE] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A3D0EE]" />
                <span>Kabinet Cakrasena • Periode 2026</span>
              </div>
            </div>

            {/* Misi */}
            <div className="lg:col-span-7 rounded-lg border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                  Misi Kelembagaan
                </span>
                <h3 className="font-serif font-bold text-xl text-[#1A1A1A]">
                  Empat Misi Utama BLM FEB UNAIR
                </h3>
                <ol className="space-y-3 text-xs sm:text-sm text-[#4A5568] leading-relaxed list-none">
                  {officialMissions.map((mission, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded bg-[#1B67BC] text-white flex items-center justify-center font-bold text-xs">
                        {idx + 1}
                      </span>
                      <span className="pt-0.5">{mission}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ===================================================================
              4. DELAPAN NILAI-NILAI ORGANISASI
             =================================================================== */}
          <section className="space-y-5">
            <div className="space-y-1.5">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                Prinsip Moral & Integritas
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Nilai-Nilai Organisasi
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Delapan nilai luhur yang menjadi pedoman fungsionaris BLM FEB UNAIR dalam setiap tindakan dan pengambilan keputusan:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {organizationValues.map((val) => (
                <div
                  key={val.number}
                  className="rounded-lg border border-[#A3D0EE] bg-white p-4 space-y-1.5 hover:border-[#1B67BC] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#b96d41] bg-[#C6E8F7]/30 border border-[#A3D0EE] px-2 py-0.5 rounded">
                      NILAI {val.number}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                    {val.name}
                  </h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              5. FILOSOFI LAMBANG CAKRASENA
             =================================================================== */}
          <section className="rounded-lg border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-xs space-y-8">
            <div className="space-y-1.5">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                Makna Lambang & Identitas
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Filosofi Logo Cakrasena
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed">
                Logo Kabinet Cakrasena menggabungkan simbolisme warna kelembagaan dan lima elemen lambang yang mencerminkan keteguhan peran legislatif dan pengawasan mahasiswa.
              </p>
            </div>

            {/* Tri-Warna Resmi */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                Makna Tri-Warna Logo
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {logoColors.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-lg border border-[#A3D0EE] bg-white p-4 flex flex-col justify-between space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded ${c.bgClass} shrink-0`} />
                      <span className="font-bold text-sm text-[#1A1A1A] tracking-wider">
                        {c.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 Elemen Lambang */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
                Makna Lima Elemen Lambang
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {logoElements.map((el) => (
                  <div
                    key={el.name}
                    className="rounded-lg border border-[#A3D0EE] bg-[#F5F6F8] p-4 space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="inline-block font-bold text-xs text-[#1B67BC] uppercase tracking-wide">
                        {el.name}
                      </span>
                      <h4 className="font-serif font-semibold text-xs text-[#1A1A1A]">
                        {el.meaning}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#4A5568] leading-relaxed">
                      {el.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================================================================
              6. STRUKTUR KEPENGURUSAN: KSB & BIRO
             =================================================================== */}
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                Struktur Inti & Kesekretariatan
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Pimpinan Parlemen (KSB) & Biro
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Ketua Umum, Sekretaris Jenderal, Bendahara Umum, serta dua biro pelaksana tata tertib dan manajemen keuangan organisasi:
              </p>
            </div>

            {/* KSB Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {ksbLeaders.map((lead) => (
                <div
                  key={lead.role}
                  className="rounded-lg border border-[#A3D0EE] bg-white p-6 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="inline-block font-mono text-[11px] font-bold text-white bg-[#0F294A] px-2.5 py-1 rounded">
                      {lead.role}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                      {lead.name}
                    </h3>
                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {lead.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Biro Admin & Biro Keuangan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {bureaus.map((biro) => (
                <div
                  key={biro.name}
                  className="rounded-lg border border-[#A3D0EE] bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-white bg-[#b96d41] px-2.5 py-1 rounded">
                        {biro.name.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-[#4A5568] font-medium">
                        {biro.parentRole}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-[#4A5568] font-medium block">
                        {biro.leadTitle}:
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">
                        {biro.leader}
                      </h3>
                    </div>

                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {biro.desc}
                    </p>

                    <div className="pt-2 border-t border-[#A3D0EE]/50 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B67BC] block">
                        Program Kerja Unggulan:
                      </span>
                      <div className="space-y-1 text-xs">
                        {biro.prokers.map((p) => (
                          <div key={p.name} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#1B67BC] shrink-0 mt-0.5" />
                            <span>
                              <strong>{p.name}:</strong> {p.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              7. STRUKTUR 3 KOMISI & 6 DEPARTEMEN
             =================================================================== */}
          <section className="space-y-6">
            <div className="space-y-1.5">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                Fungsi Legislatif, Pengawasan, & Advokasi
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Komisi & Departemen Parlemen
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed">
                BLM FEB UNAIR terdiri dari 3 komisi fungsional yang membawahi masing-masing 2 departemen spesialis sesuai amanat bagan struktur organisasi resmi:
              </p>
            </div>

            <div className="space-y-8">
              {commissions.map((comm) => (
                <div
                  key={comm.code}
                  className="rounded-lg border border-[#A3D0EE] bg-white p-6 sm:p-8 shadow-xs space-y-6"
                >
                  {/* Header Komisi */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#A3D0EE]/50 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-white bg-[#1B67BC] px-2.5 py-1 rounded">
                          {comm.code}
                        </span>
                        <span className="text-xs font-semibold text-[#b96d41] bg-[#C6E8F7]/30 border border-[#A3D0EE] px-2 py-0.5 rounded">
                          {comm.theme}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1A1A1A]">
                        {comm.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#4A5568] max-w-3xl leading-relaxed pt-1">
                        {comm.desc}
                      </p>
                    </div>

                    {/* Pimpinan Komisi */}
                    <div className="bg-[#F5F6F8] border border-stone-200 p-3.5 rounded-md shrink-0 space-y-1 text-xs">
                      {comm.leaders.map((ldr) => (
                        <div key={ldr.title}>
                          <span className="text-[#4A5568] block text-[11px]">
                            {ldr.title}:
                          </span>
                          <strong className="text-[#1A1A1A] block font-semibold">
                            {ldr.name}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Grid 2 Departemen di bawah Komisi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {comm.departments.map((dept) => (
                      <div
                        key={dept.name}
                        className="rounded-md border border-[#A3D0EE] bg-[#F5F6F8] p-5 space-y-3.5 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#1B67BC]">
                              DEPARTEMEN
                            </span>
                            <span className="text-[11px] font-medium text-[#4A5568] bg-white border border-stone-200 px-2 py-0.5 rounded">
                              Kepala: {dept.head}
                            </span>
                          </div>

                          <h4 className="font-serif font-bold text-base text-[#1A1A1A]">
                            {dept.name}
                          </h4>

                          <p className="text-xs text-[#4A5568] leading-relaxed">
                            {dept.desc}
                          </p>
                        </div>

                        {/* Program Kerja Departemen */}
                        <div className="pt-3 border-t border-[#A3D0EE]/50 space-y-1.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#b96d41] block">
                            Program Kerja:
                          </span>
                          <div className="space-y-1 text-xs text-[#4A5568]">
                            {dept.prokers.map((prok) => (
                              <div key={prok.name} className="flex items-start gap-1.5">
                                <span className="text-[#1B67BC] font-bold shrink-0">•</span>
                                <span>
                                  <strong className="text-[#1A1A1A]">{prok.name}:</strong> {prok.detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================
              8. FASILITAS & TEMPAT PERSIDANGAN
             =================================================================== */}
          <section className="rounded-lg border border-[#A3D0EE] bg-white p-6 sm:p-10 shadow-xs space-y-5">
            <div className="space-y-1.5">
              <span className="inline-block rounded bg-[#1B67BC] text-white px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider">
                Lokasi & Fasilitas
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A]">
                Sekretariat & Tempat Penyelenggaraan
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Fasilitas dan tempat persidangan resmi yang digunakan dalam rangkaian kegiatan legislasi, pengawasan, dan advokasi BLM FEB UNAIR:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-md border border-[#A3D0EE] bg-[#F5F6F8] p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#b96d41] px-2 py-0.5 rounded inline-block">
                  Kantor Utama
                </span>
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Sekretariat Parlemen (GKM Lt. 1)
                </h3>
                <p className="text-xs text-[#1B67BC] font-medium flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1B67BC]" />
                  <span>Graha Krida Mahasiswa Lt. 1, FEB UNAIR</span>
                </p>
                <p className="text-[11px] text-[#4A5568] leading-relaxed">
                  Pusat administrasi, konsultasi aspirasi tatap muka, dan penyerahan permohonan salinan naskah hukum fisik.
                </p>
              </div>

              <div className="rounded-md border border-[#A3D0EE] bg-[#F5F6F8] p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#1B67BC] px-2 py-0.5 rounded inline-block">
                  Ruang Sidang
                </span>
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Ruang Sidang Parlemen (Gedung A)
                </h3>
                <p className="text-xs text-[#1B67BC] font-medium flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1B67BC]" />
                  <span>Gedung A, FEB UNAIR</span>
                </p>
                <p className="text-[11px] text-[#4A5568] leading-relaxed">
                  Tempat penyelenggaraan Sidang Pleno BLM, Sidang Prosedur Tetap (Protap), dan pengesahan Undang-Undang.
                </p>
              </div>

              <div className="rounded-md border border-[#A3D0EE] bg-[#F5F6F8] p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#0F294A] px-2 py-0.5 rounded inline-block">
                  Koordinasi Ormawa
                </span>
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Gedung PHB (Pusat Himpunan & Badan)
                </h3>
                <p className="text-xs text-[#1B67BC] font-medium flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1B67BC]" />
                  <span>Area Gedung PHB, FEB UNAIR</span>
                </p>
                <p className="text-[11px] text-[#4A5568] leading-relaxed">
                  Sekretariat bersama ormawa, area koordinasi lintas himpunan, dan papan publikasi resmi produk hukum.
                </p>
              </div>

              <div className="rounded-md border border-[#A3D0EE] bg-[#F5F6F8] p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#3885CC] px-2 py-0.5 rounded inline-block">
                  Forum Terbuka
                </span>
                <h3 className="font-serif font-bold text-sm text-[#1A1A1A]">
                  Aula Fadjar Notonegoro (AFN)
                </h3>
                <p className="text-xs text-[#1B67BC] font-medium flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#1B67BC]" />
                  <span>Lantai 2 Gedung FEB UNAIR</span>
                </p>
                <p className="text-[11px] text-[#4A5568] leading-relaxed">
                  Aula utama pelaksanaan Rapat Dengar Pendapat Umum (RDPU), Kongres Mahasiswa, dan sosialisasi akbar produk hukum.
                </p>
              </div>
            </div>
          </section>

          {/* ===================================================================
              9. KONTAK & NARAHUBUNG RESMI (SESUAI BOOKLET HAL. 25)
             =================================================================== */}
          <section className="rounded-lg border border-[#A3D0EE]/30 bg-[#0F294A] text-white p-6 sm:p-10 shadow-sm space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A3D0EE]">
                Saluran Komunikasi Resmi
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                Hubungi Sekretariat & Narahubung Parlemen
              </h2>
              <p className="text-xs sm:text-sm text-[#C6E8F7]/85 max-w-2xl leading-relaxed">
                Mahasiswa, ormawa, atau instansi yang memerlukan koordinasi resmi, pengajuan aspirasi, atau salinan berkas dapat menghubungi saluran resmi berikut:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="rounded-md bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sekretariat Fisik</span>
                </span>
                <p className="text-xs text-white/90 leading-relaxed">
                  Graha Krida Mahasiswa (GKM) Lantai 1, Fakultas Ekonomi dan Bisnis, Universitas Airlangga, Jl. Airlangga No. 4–6, Surabaya.
                </p>
              </div>

              <div className="rounded-md bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Surel Resmi</span>
                </span>
                <a
                  href="mailto:blmfebunair2026@gmail.com"
                  className="text-xs text-[#C6E8F7] hover:text-white transition-colors block underline"
                >
                  blmfebunair2026@gmail.com
                </a>
              </div>

              <div className="rounded-md bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </span>
                <a
                  href="https://www.instagram.com/blmfebunair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#C6E8F7] hover:text-white transition-colors block underline"
                >
                  @blmfebunair
                </a>
              </div>

              <div className="rounded-md bg-white/10 p-4 border border-white/15 space-y-1">
                <span className="text-[11px] font-bold text-[#A3D0EE] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Narahubung</span>
                </span>
                <div className="text-xs space-y-1">
                  <div>
                    Rafly (Ketum):{" "}
                    <a
                      href="https://wa.me/628155010561"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C6E8F7] hover:underline font-bold"
                    >
                      +62 815-5010-561
                    </a>
                  </div>
                  <div>
                    Lintang (Kadep PI):{" "}
                    <a
                      href="https://wa.me/6281334556760"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C6E8F7] hover:underline font-bold"
                    >
                      +62 813-3455-6760
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
