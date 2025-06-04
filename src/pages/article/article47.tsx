import React from "react";
import Navbar from "@/components/navbar/Navbar";       
import Image from "next/image"; 
import BmiTable from "@/components/ArticleComponent/BmiTable";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";
import ExitButton from "@/components/ArticleComponent/exitButton";
import Article from "@/components/ArticleComponent/Article";

const Article47 = () => {
    return (
        <Article
            title="TDEE dan Kesehatan Mental"
            imageSrc="/tdee47.jpg"
            content={
                <div className="space-y-6 pb-20">
                    <p className="text-white text-lg leading-relaxed">
                        Total Daily Energy Expenditure (TDEE) tidak hanya mempengaruhi kesehatan fisik,
                        tetapi juga memiliki dampak signifikan terhadap kesehatan mental. Pemahaman
                        tentang hubungan antara energi, nutrisi, dan kesehatan mental sangat penting
                        untuk kesejahteraan secara keseluruhan.
                    </p>

                    <h2 className="text-2xl font-semibold text-[#34D399]">Hubungan TDEE dan Kesehatan Mental</h2>
                    <p className="text-white text-lg leading-relaxed">
                        Beberapa aspek penting dalam hubungan TDEE dan kesehatan mental:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white text-lg">
                        <li>Energi dan Fungsi Otak
                            <ul className="list-disc pl-6 mt-2">
                                <li>Metabolisme glukosa</li>
                                <li>Produksi neurotransmitter</li>
                                <li>Fungsi kognitif</li>
                                <li>Keseimbangan hormon</li>
                            </ul>
                        </li>
                        <li>Nutrisi dan Mood
                            <ul className="list-disc pl-6 mt-2">
                                <li>Asam amino esensial</li>
                                <li>Vitamin dan mineral</li>
                                <li>Asam lemak omega-3</li>
                                <li>Antioksidan</li>
                            </ul>
                        </li>
                        <li>Stres dan Energi
                            <ul className="list-disc pl-6 mt-2">
                                <li>Respons stres</li>
                                <li>Kortisol</li>
                                <li>Adaptasi metabolik</li>
                                <li>Pemulihan</li>
                            </ul>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-[#34D399]">Nutrisi untuk Kesehatan Mental</h2>
                    <p className="text-white text-lg leading-relaxed">
                        Panduan nutrisi untuk mendukung kesehatan mental:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white text-lg">
                        <li>Makronutrien
                            <ul className="list-disc pl-6 mt-2">
                                <li>Karbohidrat kompleks</li>
                                <li>Protein berkualitas</li>
                                <li>Lemak sehat</li>
                                <li>Serat</li>
                            </ul>
                        </li>
                        <li>Mikronutrien
                            <ul className="list-disc pl-6 mt-2">
                                <li>Vitamin B kompleks</li>
                                <li>Vitamin D</li>
                                <li>Magnesium</li>
                                <li>Zinc</li>
                            </ul>
                        </li>
                        <li>Nutrisi Spesifik
                            <ul className="list-disc pl-6 mt-2">
                                <li>Omega-3</li>
                                <li>Triptofan</li>
                                <li>Antioksidan</li>
                                <li>Probiotik</li>
                            </ul>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-[#34D399]">Strategi Manajemen Energi</h2>
                    <p className="text-white text-lg leading-relaxed">
                        Cara mengelola energi untuk kesehatan mental:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white text-lg">
                        <li>Pola Makan
                            <ul className="list-disc pl-6 mt-2">
                                <li>Regularitas</li>
                                <li>Keseimbangan</li>
                                <li>Variasi</li>
                                <li>Hidrasi</li>
                            </ul>
                        </li>
                        <li>Aktivitas Fisik
                            <ul className="list-disc pl-6 mt-2">
                                <li>Latihan teratur</li>
                                <li>Intensitas moderat</li>
                                <li>Pemulihan</li>
                                <li>Konsistensi</li>
                            </ul>
                        </li>
                        <li>Istirahat
                            <ul className="list-disc pl-6 mt-2">
                                <li>Kualitas tidur</li>
                                <li>Ritme sirkadian</li>
                                <li>Relaksasi</li>
                                <li>Recovery</li>
                            </ul>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-[#34D399]">Manajemen Stres</h2>
                    <p className="text-white text-lg leading-relaxed">
                        Strategi mengelola stres dan energi:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white text-lg">
                        <li>Teknik Relaksasi
                            <ul className="list-disc pl-6 mt-2">
                                <li>Meditasi</li>
                                <li>Pernapasan</li>
                                <li>Mindfulness</li>
                                <li>Yoga</li>
                            </ul>
                        </li>
                        <li>Lifestyle
                            <ul className="list-disc pl-6 mt-2">
                                <li>Rutinitas sehat</li>
                                <li>Manajemen waktu</li>
                                <li>Hubungan sosial</li>
                                <li>Hobi</li>
                            </ul>
                        </li>
                        <li>Dukungan
                            <ul className="list-disc pl-6 mt-2">
                                <li>Konseling</li>
                                <li>Grup dukungan</li>
                                <li>Komunitas</li>
                                <li>Profesional</li>
                            </ul>
                        </li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-[#34D399]">Tips Praktis</h2>
                    <p className="text-white text-lg leading-relaxed">
                        Tips untuk menjaga kesehatan mental:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-white text-lg">
                        <li>Nutrisi
                            <ul className="list-disc pl-6 mt-2">
                                <li>Makan teratur</li>
                                <li>Porsi seimbang</li>
                                <li>Variasi makanan</li>
                                <li>Hindari junk food</li>
                            </ul>
                        </li>
                        <li>Aktivitas
                            <ul className="list-disc pl-6 mt-2">
                                <li>Olahraga rutin</li>
                                <li>Istirahat cukup</li>
                                <li>Hidrasi</li>
                                <li>Paparan sinar matahari</li>
                            </ul>
                        </li>
                        <li>Keseimbangan
                            <ul className="list-disc pl-6 mt-2">
                                <li>Work-life balance</li>
                                <li>Manajemen stres</li>
                                <li>Dukungan sosial</li>
                                <li>Self-care</li>
                            </ul>
                        </li>
                    </ul>

                    <p className="mt-6 text-white text-lg leading-relaxed">
                        Memahami dan mengelola TDEE dengan baik dapat memberikan dampak positif
                        pada kesehatan mental. Dengan pendekatan holistik yang mencakup nutrisi,
                        aktivitas fisik, dan manajemen stres, kita dapat mencapai keseimbangan
                        yang optimal antara kesehatan fisik dan mental.
                    </p>
         </div>
            }
        />
    );
}

export default Article47;