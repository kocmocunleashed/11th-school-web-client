"use client";

import Link from "next/link";
import { useState } from "react";

const sections = [
  {
    id: "clubs",
    title: "Секц, дугуйлан",
    description: "Соёл, спорт, STEAM клубүүдэд хамрагдах боломжууд.",
    icon: "С",
  },
  {
    id: "calendar",
    title: "Календар",
    description: "Сургалтын хуваарь, амралт болон тэмдэглэлт өдөрүүд.",
    icon: "К",
  },
  {
    id: "environment",
    title: "Сургалтын орчин",
    description: "Хичээлийн байр, лаборатори, номын сангийн орчин.",
    icon: "С",
  },
  {
    id: "rules",
    title: "Дүрэм журам",
    description: "Суралцагчийн ёс зүй, сургуулийн дүрэм болон бодлого.",
    icon: "Д",
  },
];

// Sample data for representing cards with HP character placeholders
const clubsData = [
  {
    id: 1,
    name: "Математик клуб",
    description: "Математикийн олимпиад, бодлого бодох, судалгаа",
    teacher: "Minerva McGonagall",
    schedule: "Даваа, Мягмар 15:00-17:00",
    members: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Neville Longbottom", "Luna Lovegood"],
    activities: "Олимпиадын бэлтгэл, бодлого бодох техник, математикийн түүх",
    requirements: "Математикийн үндсэн мэдлэг, сонирхол",
    contact: "mcgonagall@school.mn",
  },
  {
    id: 2,
    name: "Хөгжмийн клуб",
    description: "Хөгжмийн зэмсэг тоглох, хамтлаг",
    teacher: "Filius Flitwick",
    schedule: "Лхагва, Пүрэв 14:00-16:00",
    members: ["Ginny Weasley", "Cho Chang", "Padma Patil", "Parvati Patil", "Dean Thomas"],
    activities: "Хөгжмийн зэмсэг тоглох, хамтлаг бүрдүүлэх, тоглолт",
    requirements: "Хөгжмийн сонирхол, зэмсэг эсвэл дуулах чадвар",
    contact: "flitwick@school.mn",
  },
  {
    id: 3,
    name: "Спортын клуб",
    description: "Сагсан бөмбөг, хөлбөмбөг, волейбол",
    teacher: "Rubeus Hagrid",
    schedule: "Баасан, Бямба 16:00-18:00",
    members: ["Oliver Wood", "Angelina Johnson", "Katie Bell", "Alicia Spinnet", "Fred Weasley", "George Weasley"],
    activities: "Сагсан бөмбөг, хөлбөмбөг, волейбол, тэмцээн",
    requirements: "Биеийн тамирын сонирхол",
    contact: "hagrid@school.mn",
  },
  {
    id: 4,
    name: "Уран зохиол клуб",
    description: "Шүлэг, зохиол бичих, уншлага",
    teacher: "Severus Snape",
    schedule: "Мягмар, Лхагва 15:00-17:00",
    members: ["Hermione Granger", "Luna Lovegood", "Ginny Weasley", "Colin Creevey", "Dennis Creevey"],
    activities: "Шүлэг бичих, зохиол унших, уран зохиолын дүн шинжилгээ",
    requirements: "Уран зохиолын сонирхол",
    contact: "snape@school.mn",
  },
  {
    id: 5,
    name: "Компьютерийн клуб",
    description: "Програмчлал, веб хөгжүүлэлт",
    teacher: "Albus Dumbledore",
    schedule: "Пүрэв, Баасан 14:00-16:00",
    members: ["Hermione Granger", "Percy Weasley", "Penelope Clearwater", "Cedric Diggory", "Marietta Edgecombe"],
    activities: "Програмчлал, веб хөгжүүлэлт, робот техник",
    requirements: "Компьютерийн үндсэн мэдлэг",
    contact: "dumbledore@school.mn",
  },
  {
    id: 6,
    name: "Хэлний клуб",
    description: "Англи, Орос, Хятад хэл",
    teacher: "Pomona Sprout",
    schedule: "Даваа, Пүрэв 15:00-17:00",
    members: ["Hermione Granger", "Viktor Krum", "Fleur Delacour", "Cho Chang", "Padma Patil"],
    activities: "Хэл сурах, ярилцлага, соёлын солилцоо",
    requirements: "Хэл сурах сонирхол",
    contact: "sprout@school.mn",
  },
];

const calendarData = [
  {
    id: 1,
    title: "Сургалтын эхлэл",
    date: "2024 оны 9-р сарын 1",
    type: "Тэмдэглэлт өдөр",
    description: "Шинэ суралцагчдын баяр ёслол",
    organizer: "Albus Dumbledore",
    participants: ["Harry Potter", "Hermione Granger", "Ron Weasley", "Neville Longbottom", "Ginny Weasley"],
    location: "Гол танхим",
    duration: "09:00-12:00",
    details: "Шинэ суралцагчдыг угтаж, сургуулийн дүрэм, хуваарийг танилцуулах",
  },
  {
    id: 2,
    title: "Амралтын өдөр",
    date: "2024 оны 10-р сарын 1-7",
    type: "Амралт",
    description: "Намрын амралт",
    organizer: "Minerva McGonagall",
    participants: ["Бүх суралцагчид"],
    location: "Гэртээ",
    duration: "7 хоног",
    details: "Намрын амралт, суралцагчид амралт авах боломж",
  },
  {
    id: 3,
    title: "Шалгалтын хуваарь",
    date: "2024 оны 12-р сарын 15-20",
    type: "Шалгалт",
    description: "Улирлын эцсийн шалгалт",
    organizer: "Severus Snape",
    participants: ["Бүх суралцагчид"],
    location: "Хичээлийн байр",
    duration: "5 хоног",
    details: "Математик, Физик, Хими, Биологи, Түүх, Хэл зэрэг бүх хичээлийн шалгалт",
  },
  {
    id: 4,
    title: "Олимпиад",
    date: "2024 оны 11-р сарын 10",
    type: "Тэмцээн",
    description: "Математик, физикийн олимпиад",
    organizer: "Filius Flitwick",
    participants: ["Hermione Granger", "Percy Weasley", "Penelope Clearwater", "Cedric Diggory"],
    location: "Танхим 101",
    duration: "10:00-14:00",
    details: "Математик, физикийн олимпиадын тэмцээн, ялагчдыг шагнах",
  },
  {
    id: 5,
    title: "Баяр ёслол",
    date: "2024 оны 12-р сарын 31",
    type: "Тэмдэглэлт өдөр",
    description: "Шинэ жилийн баяр",
    organizer: "Rubeus Hagrid",
    participants: ["Бүх суралцагчид", "Багш нар"],
    location: "Гол танхим",
    duration: "18:00-24:00",
    details: "Шинэ жилийн баяр ёслол, хөгжим, хоол, тоглолт",
  },
  {
    id: 6,
    title: "Хичээлийн хуваарь",
    date: "Даваа-Баасан",
    type: "Хуваарь",
    description: "8:00-16:00 хичээл",
    organizer: "Pomona Sprout",
    participants: ["Бүх суралцагчид"],
    location: "Хичээлийн байр",
    duration: "Өдөр бүр",
    details: "Эхний хичээл 8:00, сүүлийн хичээл 16:00, цайны завсарлага 12:00-13:00",
  },
];

const environmentData = [
  {
    id: 1,
    name: "Математикийн анги",
    description: "Интерактив самбар, тооцоолох хэрэгсэл",
    capacity: "30 суралцагч",
    location: "2-р давхар",
    equipment: "Интерактив самбар, тооцоолуур, геометрийн хэрэгсэл",
    supervisor: "Minerva McGonagall",
    hours: "Даваа-Баасан 8:00-17:00",
    features: "Агааржуулалттай, байгалийн гэрэлтэй, Wi-Fi холболттой",
  },
  {
    id: 2,
    name: "Физикийн лаборатори",
    description: "Туршилт, судалгаа хийх орчин",
    capacity: "20 суралцагч",
    location: "3-р давхар",
    equipment: "Туршилтын хэрэгсэл, осциллограф, спектрометр",
    supervisor: "Severus Snape",
    hours: "Мягмар, Лхагва 9:00-16:00",
    features: "Аюулгүй байдлын систем, хамгаалалтын хэрэгсэл",
  },
  {
    id: 3,
    name: "Химийн лаборатори",
    description: "Аюулгүй туршилт хийх орчин",
    capacity: "20 суралцагч",
    location: "3-р давхар",
    equipment: "Химийн бодис, туршилтын хэрэгсэл, аюулгүй байдлын систем",
    supervisor: "Severus Snape",
    hours: "Пүрэв, Баасан 9:00-16:00",
    features: "Агааржуулалт, аюулгүй байдлын дүрэм, хамгаалалтын хэрэгсэл",
  },
  {
    id: 4,
    name: "Номын сан",
    description: "Ном, сэтгүүл, дижитал материал",
    capacity: "50 суралцагч",
    location: "1-р давхар",
    equipment: "Ном, сэтгүүл, компьютер, уншлагын заал",
    supervisor: "Irma Pince",
    hours: "Даваа-Баасан 8:00-18:00",
    features: "Тайван орчин, Wi-Fi, дижитал номын сан",
  },
  {
    id: 5,
    name: "Компьютерийн анги",
    description: "Орчин үеийн компьютер, интернет",
    capacity: "25 суралцагч",
    location: "2-р давхар",
    equipment: "Орчин үеийн компьютер, проектор, принтер",
    supervisor: "Albus Dumbledore",
    hours: "Даваа-Баасан 8:00-17:00",
    features: "Хурдан интернет, програмчлалын хэрэгсэл, 3D принтер",
  },
  {
    id: 6,
    name: "Спортын заал",
    description: "Спортын төрөл бүрийн тэмцээн",
    capacity: "100 хүн",
    location: "Гадаа талбай",
    equipment: "Сагсан бөмбөгийн цамхаг, хөлбөмбөгийн талбай, волейболын талбай",
    supervisor: "Rubeus Hagrid",
    hours: "Даваа-Бямба 7:00-20:00",
    features: "Гэрэлтэй, хамгаалалттай, шүргээний шал",
  },
];

const rulesData = [
  {
    id: 1,
    title: "Хувцаслалт",
    description: "Цэвэрхэн, зохих хувцаслалт",
    category: "Ёс зүй",
    details: "Суралцагчид цэвэрхэн, зохих хувцаслалттай байх ёстой. Хичээлийн үед спортын хувцас зөвхөн спортын хичээлд зөвшөөрнө.",
    enforcer: "Minerva McGonagall",
    consequences: "Анхааруулга, эцэг эхтэй уулзалт",
    examples: "Harry Potter, Hermione Granger, Ron Weasley нар дүрмийг сайн дагадаг",
  },
  {
    id: 2,
    title: "Цагийн дүрэм",
    description: "Хичээлд цагт ирэх, орхих",
    category: "Дүрэм",
    details: "Хичээл 8:00 цагт эхэлнэ. Суралцагчид цагт ирэх ёстой. Хожуу ирсэн тохиолдолд багшид мэдэгдэх ёстой.",
    enforcer: "Severus Snape",
    consequences: "Хожуу ирсэн тооллого, шаардлагатай тохиолдолд нэмэлт даалгавар",
    examples: "Neville Longbottom, Seamus Finnigan нар заримдаа хожуу ирдэг",
  },
  {
    id: 3,
    title: "Хувийн хэрэглээ",
    description: "Утас, планшет ашиглах дүрэм",
    category: "Бодлого",
    details: "Хичээлийн үед утас, планшет ашиглахыг хориглоно. Зөвхөн завсарлага, амралтын үед ашиглах боломжтой.",
    enforcer: "Filius Flitwick",
    consequences: "Утас хураах, эцэг эхтэй уулзалт",
    examples: "Hermione Granger дүрмийг сайн дагадаг, зарим суралцагчид зөрчилддөг",
  },
  {
    id: 4,
    title: "Аюулгүй байдал",
    description: "Сургуулийн аюулгүй байдлын дүрэм",
    category: "Дүрэм",
    details: "Сургуулийн талбайд аюулгүй байдлыг хангах. Гал, усны аюулгүй байдлын дүрмийг мэдэх. Онцгой байдлын үед зааварчилгааг дагах.",
    enforcer: "Rubeus Hagrid",
    consequences: "Анхааруулга, ноцтой тохиолдолд сургуулиас хөөх",
    examples: "Бүх суралцагчид аюулгүй байдлын дүрмийг мэдэх ёстой",
  },
  {
    id: 5,
    title: "Хамтын ажиллагаа",
    description: "Багш, суралцагчдын харилцаа",
    category: "Ёс зүй",
    details: "Багш, суралцагчдын хооронд хүндэтгэлтэй харилцаа байх ёстой. Хамтын ажиллагаа, харилцан туслалцаа үзүүлэх.",
    enforcer: "Pomona Sprout",
    consequences: "Анхааруулга, зааварчилгаа",
    examples: "Hermione Granger, Percy Weasley нар сайн жишээ үзүүлдэг",
  },
  {
    id: 6,
    title: "Шалгалтын дүрэм",
    description: "Шалгалтын явцад баримтлах дүрэм",
    category: "Дүрэм",
    details: "Шалгалтын үед хууралт хориглоно. Зөвхөн өөрийн бодол, мэдлэгээр хариулах. Шалгалтын дүрмийг зөрчсөн тохиолдолд шалгалтын оноо цуцлагдана.",
    enforcer: "Severus Snape",
    consequences: "Шалгалтын оноо цуцлах, ноцтой тохиолдолд улирлын оноо цуцлах",
    examples: "Cedric Diggory, Hermione Granger нар шударга шалгалт өгдөг",
  },
];

function Card({ item, type }: { item: any; type: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="rounded-xl shadow-lg transition-all hover:shadow-xl cursor-pointer"
      style={{
        background: '#07499e',
        border: '2px solid #ffb100',
      }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-5">
        {type === 'clubs' && (
          <>
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-bold flex-1" style={{ color: '#ffb100' }}>
                {item.name}
              </h4>
              <span className="text-xl ml-2" style={{ color: '#ffb100' }}>
                {isExpanded ? '−' : '+'}
              </span>
            </div>
            <p className="mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
              {item.description}
            </p>
            <p className="text-sm mb-1" style={{ color: '#ffffff', opacity: 0.8 }}>
              <strong>Багш:</strong> {item.teacher}
            </p>
            <p className="text-sm" style={{ color: '#ffffff', opacity: 0.8 }}>
              <strong>Цагийн хуваарь:</strong> {item.schedule}
            </p>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#ffb100', opacity: 0.3 }}>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Гишүүд:</strong> {item.members.join(', ')}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Үйл ажиллагаа:</strong> {item.activities}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Шаардлага:</strong> {item.requirements}
                </p>
                <p className="text-sm" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Холбоо барих:</strong> {item.contact}
                </p>
              </div>
            )}
          </>
        )}
        {type === 'calendar' && (
          <>
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-bold flex-1" style={{ color: '#ffb100' }}>
                {item.title}
              </h4>
              <span className="text-xl ml-2" style={{ color: '#ffb100' }}>
                {isExpanded ? '−' : '+'}
              </span>
            </div>
            <p className="mb-2 font-semibold" style={{ color: '#ffffff' }}>
              {item.date}
            </p>
            <p className="text-sm mb-1" style={{ color: '#ffffff', opacity: 0.9 }}>
              <strong>Төрөл:</strong> {item.type}
            </p>
            <p className="text-sm" style={{ color: '#ffffff', opacity: 0.8 }}>
              {item.description}
            </p>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#ffb100', opacity: 0.3 }}>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Зохион байгуулагч:</strong> {item.organizer}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Оролцогчид:</strong> {Array.isArray(item.participants) ? item.participants.join(', ') : item.participants}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Байршил:</strong> {item.location}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Хугацаа:</strong> {item.duration}
                </p>
                <p className="text-sm" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Дэлгэрэнгүй:</strong> {item.details}
                </p>
              </div>
            )}
          </>
        )}
        {type === 'environment' && (
          <>
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-bold flex-1" style={{ color: '#ffb100' }}>
                {item.name}
              </h4>
              <span className="text-xl ml-2" style={{ color: '#ffb100' }}>
                {isExpanded ? '−' : '+'}
              </span>
            </div>
            <p className="mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
              {item.description}
            </p>
            <p className="text-sm mb-1" style={{ color: '#ffffff', opacity: 0.8 }}>
              <strong>Багтаамж:</strong> {item.capacity}
            </p>
            <p className="text-sm" style={{ color: '#ffffff', opacity: 0.8 }}>
              <strong>Байршил:</strong> {item.location}
            </p>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#ffb100', opacity: 0.3 }}>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Тоног төхөөрөмж:</strong> {item.equipment}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Хариуцлагатай:</strong> {item.supervisor}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Ажиллах цаг:</strong> {item.hours}
                </p>
                <p className="text-sm" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Онцлог:</strong> {item.features}
                </p>
              </div>
            )}
          </>
        )}
        {type === 'rules' && (
          <>
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-lg font-bold flex-1" style={{ color: '#ffb100' }}>
                {item.title}
              </h4>
              <span className="text-xl ml-2" style={{ color: '#ffb100' }}>
                {isExpanded ? '−' : '+'}
              </span>
            </div>
            <p className="mb-2 text-sm" style={{ color: '#ffffff', opacity: 0.9 }}>
              {item.description}
            </p>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
              style={{
                background: '#ffb100',
                color: '#000000',
              }}
            >
              {item.category}
            </span>
            {isExpanded && (
              <div className="mt-4 pt-4 border-t" style={{ borderColor: '#ffb100', opacity: 0.3 }}>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Дэлгэрэнгүй:</strong> {item.details}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Хариуцлагатай:</strong> {item.enforcer}
                </p>
                <p className="text-sm mb-2" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Үр дагавар:</strong> {item.consequences}
                </p>
                <p className="text-sm" style={{ color: '#ffffff', opacity: 0.9 }}>
                  <strong>Жишээ:</strong> {item.examples}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function RepresentingCards({ 
  title, 
  items, 
  type 
}: { 
  title: string; 
  items: any[]; 
  type: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4" style={{ color: '#ffb100' }}>
        Representing cards[{title}]
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item) => (
          <Card key={item.id} item={item} type={type} />
        ))}
      </div>
      {items.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          style={{
            background: '#ffb100',
            color: '#07499e',
          }}
        >
          {expanded ? 'Бага харуулах' : `Бүгдийг харуулах (${items.length - 3} илүү)`}
        </button>
      )}
    </div>
  );
}

export default function CoursePage() {
  return (
    <div className="min-h-screen px-6 py-16 md:px-12" style={{ background: 'rgba(7, 73, 158, 0.1)' }}>
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-3">
          <p className="font-semibold tracking-wide uppercase" style={{ color: '#ffb100' }}>
            Сургалт
          </p>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: '#07499e' }}>
            Манай сургалтын бүтцээр аялна уу
          </h1>
          <p className="max-w-2xl mx-auto" style={{ color: '#07499e', opacity: 0.8 }}>
            Таны сонирхож буй сургалтын мэдээлэл, клуб, хуваарь болон дүрмийг
            доорх хэсгүүдээс шууд олж үзээрэй.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="block rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-105"
              style={{
                background: '#07499e',
                border: '2px solid #ffb100',
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg shadow"
                  style={{
                    background: '#ffb100',
                    color: '#07499e',
                  }}
                >
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: '#ffb100' }}>
                    {section.title}
                  </h2>
                  <p className="mt-2" style={{ color: '#ffb100', opacity: 0.9 }}>
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="space-y-10">
          <section
            id="clubs"
            className="rounded-2xl p-8 shadow-lg scroll-mt-24"
            style={{
              background: '#07499e',
              border: '2px solid #ffb100',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full" style={{ background: '#ffb100' }} />
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffb100' }}>
                {sections[0].title}
              </h2>
            </div>
            <p className="mt-4" style={{ color: '#ffb100', opacity: 0.9 }}>
              {sections[0].description}
            </p>
            <RepresentingCards title="Секц, дугуйлан" items={clubsData} type="clubs" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Товч мэдээлэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Энд илүү нарийвчилсан мэдээлэл, холбогдох багш, цагийн
                  хуваарийг байрлуулах боломжтой.
                </p>
              </div>
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Үйлдэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Нэмэлт линк, баримт бичиг эсвэл бүртгэлийн товчыг энд
                  холбоно.
                </p>
              </div>
            </div>
          </section>

          <section
            id="calendar"
            className="rounded-2xl p-8 shadow-lg scroll-mt-24"
            style={{
              background: '#07499e',
              border: '2px solid #ffb100',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full" style={{ background: '#ffb100' }} />
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffb100' }}>
                {sections[1].title}
              </h2>
            </div>
            <p className="mt-4" style={{ color: '#ffb100', opacity: 0.9 }}>
              {sections[1].description}
            </p>
            <RepresentingCards title="Календар" items={calendarData} type="calendar" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Товч мэдээлэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Энд илүү нарийвчилсан мэдээлэл, холбогдох багш, цагийн
                  хуваарийг байрлуулах боломжтой.
                </p>
              </div>
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Үйлдэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Нэмэлт линк, баримт бичиг эсвэл бүртгэлийн товчыг энд
                  холбоно.
                </p>
              </div>
            </div>
          </section>

          <section
            id="environment"
            className="rounded-2xl p-8 shadow-lg scroll-mt-24"
            style={{
              background: '#07499e',
              border: '2px solid #ffb100',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full" style={{ background: '#ffb100' }} />
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffb100' }}>
                {sections[2].title}
              </h2>
            </div>
            <p className="mt-4" style={{ color: '#ffb100', opacity: 0.9 }}>
              {sections[2].description}
            </p>
            <RepresentingCards title="Сургалтын орчин" items={environmentData} type="environment" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Товч мэдээлэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Энд илүү нарийвчилсан мэдээлэл, холбогдох багш, цагийн
                  хуваарийг байрлуулах боломжтой.
                </p>
              </div>
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Үйлдэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Нэмэлт линк, баримт бичиг эсвэл бүртгэлийн товчыг энд
                  холбоно.
                </p>
              </div>
            </div>
          </section>

          <section
            id="rules"
            className="rounded-2xl p-8 shadow-lg scroll-mt-24"
            style={{
              background: '#07499e',
              border: '2px solid #ffb100',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full" style={{ background: '#ffb100' }} />
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#ffb100' }}>
                {sections[3].title}
              </h2>
            </div>
            <p className="mt-4" style={{ color: '#ffb100', opacity: 0.9 }}>
              {sections[3].description}
            </p>
            <RepresentingCards title="Дүрэм журам" items={rulesData} type="rules" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Товч мэдээлэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Энд илүү нарийвчилсан мэдээлэл, холбогдох багш, цагийн
                  хуваарийг байрлуулах боломжтой.
                </p>
              </div>
              <div className="p-4 rounded-xl border" style={{ background: 'rgba(255, 177, 0, 0.1)', borderColor: '#ffb100' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#ffb100' }}>Үйлдэл</h3>
                <p className="text-sm" style={{ color: '#ffb100', opacity: 0.9 }}>
                  Нэмэлт линк, баримт бичиг эсвэл бүртгэлийн товчыг энд
                  холбоно.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
