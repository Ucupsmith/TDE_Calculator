import React from "react";
import Navbar from "@/components/navbar/Navbar";       
import Image from "next/image"; 
import BmiTable from "@/components/ArticleComponent/BmiTable";
import AktivitasTable from "@/components/ArticleComponent/AktivitasTable";
import ExitButton from "@/components/ArticleComponent/exitButton";

const Article14 = () => {
    return(
    <>
        <ExitButton/>
        <div className="lg:pt-40 pt-10 font-poppins">
             <div className="flex justify-center">
                <Image 
                    src="/lari.svg" 
                    alt="gambar orang lari" 
                    width={400} 
                    height={400}/>
            </div>
            <div>
                <h1 className="text-2xl text-center font-bold pb-5 pl-10 mt-10 text-[#34D399]">Understanding TDEE: The Key to Managing <br/> Your Daily Calorie Needs</h1>
                <h3 className="pl-10"><span className="font-bold text-lg">TDEE </span> <span className="italic">(Total Daily Energy Expenditure)</span> adalah jumlah total kalori yang dibakar oleh tubuh dalam satu hari. Ini mencakup seluruh aktivitas tubuh, mulai dari metabolisme basal (BMR)—yakni energi yang dibutuhkan untuk fungsi vital seperti bernapas dan detak jantung saat istirahat—hingga pencernaan makanan, serta aktivitas fisik seperti berjalan, bekerja, dan berolahraga. Dengan kata lain, TDEE menggambarkan seberapa banyak energi yang dibutuhkan tubuh untuk mempertahankan fungsi harian secara keseluruhan.</h3>
                <h2 className="font-bold pt-10 pl-10 text-xl">1.BMI - Body Mass Index</h2>
                <p className="pl-10 mt-5">BMI (Indeks Massa Tubuh) digunakan untuk mengetahui apakah berat badan seseorang ideal atau tidak berdasarkan tinggi badan.</p>
                <p className="text-center pt-10 pl-10 mt-5 text-lg font-bold">Rumus BMI:</p>
                <p className="text-center pl-10 mt-5 italic">BMI = Berat Badan (kg) / (Tinggi Badan (m))²</p>
                <p className="text-center pt-10 pl-10 mt-5 text-lg font-bold">Kategori BMI:</p>
                <BmiTable/>
                <h2 className="font-bold pt-20 pl-10 text-xl">2.BMR - Basal Metabolic Rate</h2>
                <p className="pl-10 mt-5">BMR adalah jumlah kalori yang dibutuhkan tubuh untuk menjalankan fungsi dasar saat istirahat (seperti bernapas, detak jantung, dll).</p>
                <p className="text-center pt-10 pl-10 mt-5 text-lg font-bold">Rumus BMR:</p>
                <p className="text-center pl-10 mt-5 italic">BMR = 10 x berat (kg) + 6.25 x tinggi (cm) - 5 x umur + 5</p>
                <p className="text-center pt-5 pl-10 text-gray-500 text-sm italic">(Untuk Pria)</p>
                <p className="pt-5 text-center pl-10 mt-5 italic">BMR = 10 x berat (kg) + 6.25 x tinggi (cm) - 5 x umur - 161</p>
                 <p className="text-center pt-5 pl-10 text-gray-500 text-sm italic">(Untuk Wanita)</p>
                 <h2 className="font-bold pt-20 pl-10 text-xl">3.Cara Menghitung TDEE</h2>
                 <p className="text-center pl-10 mt-5 italic">Setelah dapat BMR, kalikan dengan faktor aktivitas fisik:</p>
                 <AktivitasTable></AktivitasTable>

         </div>
        </div>
        <Navbar />
    </>)
}

export default Article14;