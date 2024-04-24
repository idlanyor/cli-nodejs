#!/usr/bin/env node
import axios, { AxiosResponse } from "axios";
import fs from 'fs';
import path from 'path';
import ProgressBar from 'progress';
import figlet from 'figlet'
import { select, Separator, input } from "@inquirer/prompts";
import { execSync } from 'child_process'
import os from 'os'
import dotenv from "dotenv";
dotenv.config();

console.log(figlet.textSync('RoiDev-Tools'))
const callCommand = async () => {
    try {
        execSync('cls || clear')
        const answer = await select({
            message: 'Silahkan pilih menu dibawah ini',
            choices: [
                {
                    name: 'Tiktok Video',
                    value: tiktokVideo,
                    description: 'Mendownload Video dari Tiktok tanpa watermark'
                },
                {
                    name: 'Tiktok Audio',
                    value: tiktokAudio,
                    description: 'Mendownload Audio dari Tiktok'
                },
                new Separator(),
                {
                    name: 'Youtube Video',
                    value: youtubeVideo,
                    description: 'Mendownload Video dari YouTube '
                },
                {
                    name: 'Youtube Audio',
                    value: youtubeAudio,
                    description: 'Mendownload Audio dari YouTube'
                },
                new Separator(),
                {
                    name: 'Instagram Video',
                    value: instagramDl,
                    description: 'Mendownload Video dari Instagram'
                }
            ]
        })
        const url = await input({ message: `Silahkan Masukkan Link ${answer.name}:` })
        answer(url)
    } catch (e) {
        // Tangani kesalahan yang disebabkan oleh penutupan paksa prompt (Ctrl + C)
        if (e instanceof Error && e.message.startsWith('User force closed the prompt')) {
            execSync('cls || clear')
            console.log('Terimakasih sudah menggunakan.');
            process.exit(0);
        } else {
            // Tangani kesalahan lainnya
            console.error('Terjadi kesalahan:', e);
        }
    }
}
callCommand();



// const menus: string[] = ["Tiktok No Watermark", "Tiktok Audio", "Youtube Video", "Youtube Audio"]
// console.log("Daftar Menu yang tersedia");


const apiUrl: string | undefined = process.env.API_URL
const apikey: string | undefined = process.env.API_KEY
const apilol = axios.create({
    baseURL: apiUrl,
    params: {
        apikey: apikey
    }
})
const dlDir = (subject?: string) => {
    const dir = path.join(os.homedir(), 'Downloads')

    if (!subject) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        return dir
    }
    if (!fs.existsSync(path.join(dir, subject))) {
        fs.mkdirSync(path.join(dir, subject))
    }
    return path.join(dir, subject);

}


async function tiktokVideo(url: string): Promise<void> {
    try {
        // console.log("Please Wait ...")
        const response: AxiosResponse = await apilol.get(`tiktok?url=${url}`)
        const data = response.data
        const filePath: string = path.join(dlDir(), `tiktok_${Date.now()}_v.mp4`)
        if (data.status == 200 && data.message === 'success' && data.result) {
            const audioUrl: string = data.result.link

            const audioResponse: AxiosResponse = await axios.get(audioUrl,
                {
                    responseType: 'stream',
                    onDownloadProgress: (progressEvent) => {
                        const totalLength: number = parseInt(String(progressEvent.total))
                        const progressBar = new ProgressBar('[:bar] :percent', {
                            width: 100,
                            total: totalLength
                        })
                        progressBar.tick(progressEvent.loaded)
                        if (progressEvent.progress === 1) {
                            console.log('File berhasil didownload dan disimpan di : ', filePath);
                        }
                    }

                });

            audioResponse.data.pipe(fs.createWriteStream(filePath))

        } else {
            console.log("Gagal mendapatkan link audio dari API")
        }
    } catch (e) {
        console.log("Terjadi kesalahan saat mengunduh data", e);
    }
}
async function tiktokAudio(url: string): Promise<void> {
    try {
        console.log("Please Wait ...")
        const response: AxiosResponse = await apilol.get(`tiktokmusic?url=${url.split("?")[0]}`)
        const data = response.data
        const filePath: string = path.join(dlDir('Tiktok'), `tiktok_${Date.now()}_a.mp3`)
        if (data.status == 200 && data.message === 'success' && data.result) {
            const audioUrl: string = data.result

            const audioResponse: AxiosResponse = await axios.get(audioUrl,
                {
                    responseType: 'stream',
                    onDownloadProgress: (progressEvent) => {
                        const totalLength: number = parseInt(String(progressEvent.total))
                        const progressBar = new ProgressBar('[:bar] :percent', {
                            width: 100,
                            total: totalLength
                        })
                        progressBar.tick(progressEvent.loaded)
                        if (progressEvent.progress === 1) {
                            console.log('File berhasil didownload dan disimpan di : ', filePath);
                        }
                    }

                });

            audioResponse.data.pipe(fs.createWriteStream(filePath))

        } else {
            console.log("Gagal mendapatkan link audio dari API")
        }
    } catch (e) {
        console.log("Terjadi kesalahan saat mengunduh data", e);
    }
}
async function youtubeVideo(url: string): Promise<void> {
    try {
        // console.log("Please Wait ...")
        const response: AxiosResponse = await apilol.get(`ytvideo2?url=${url}`)
        const data = response.data
        const filePath: string = path.join(dlDir('Youtube'), `youtube_${Date.now()}_v.mp4`)
        if (data.status == 200 && data.message === 'success' && data.result) {
            const audioUrl: string = data.result.link

            const audioResponse: AxiosResponse = await axios.get(audioUrl,
                {
                    responseType: 'stream',
                    onDownloadProgress: (progressEvent) => {
                        const totalLength: number = parseInt(String(progressEvent.total))
                        const progressBar = new ProgressBar('[:bar] :percent', {
                            width: 100,
                            total: totalLength
                        })
                        progressBar.tick(progressEvent.loaded)
                        if (progressEvent.progress === 1) {
                            console.log('File berhasil didownload dan disimpan di : ', filePath);
                        }
                    }

                });

            audioResponse.data.pipe(fs.createWriteStream(filePath))

        } else {
            console.log("Audio ini tidak dapat didownload karena alasan otorisasi,coba link lain")
        }
    } catch (e) {
        console.log("Terjadi kesalahan saat mengunduh data", e);
    }
}
async function youtubeAudio(url: string): Promise<void> {
    try {
        console.log("Please Wait ...")
        const response: AxiosResponse = await apilol.get(`ytaudio2?url=${url}`)
        const data = response.data
        const filePath: string = path.join(dlDir('Youtube'), `youtube_${Date.now()}_a.mp3`)
        try {
            const audioUrl: string = data.result.link

            const audioResponse: AxiosResponse = await axios.get(audioUrl,
                {
                    responseType: 'stream',
                    onDownloadProgress: (progressEvent) => {
                        const totalLength: number = parseInt(String(progressEvent.total))
                        const progressBar = new ProgressBar('[:bar] :percent', {
                            width: 100,
                            total: totalLength
                        })
                        progressBar.tick(progressEvent.loaded)
                        if (progressEvent.progress === 1) {
                            console.log('File berhasil didownload dan disimpan di : ', filePath);
                        }
                    }

                });

            audioResponse.data.pipe(fs.createWriteStream(filePath))
        } catch (error) {
            console.log("Gagal mendapatkan link audio dari API")
        }
    } catch (e) {
        console.log("Terjadi kesalahan saat mengunduh data", e);
    }
}
async function instagramDl(url: string): Promise<void> {
    try {
        const response: AxiosResponse = await apilol.get(`instagram?url=${url}`);
        const data = response.data;

        if (data.status == 200 && data.message === 'success' && data.result) {
            const result: string[] = data.result;

            for (const e of result) {
                let filePath: string;
                if (e.includes('.jpg')) {
                    filePath = path.join(dlDir('Instagram'), `instagram_${Date.now()}_i.jpg`);
                } else if (e.includes('.mp4')) {
                    filePath = path.join(dlDir('Instagram'), `instagram_${Date.now()}_v.mp4`);
                } else {
                    continue;
                }

                const igResponse: AxiosResponse = await axios.get(e, {
                    responseType: 'stream',
                    onDownloadProgress: (progressEvent) => {
                        const totalLength: number = parseInt(String(progressEvent.total));
                        const progressBar = new ProgressBar('[:bar] :percent', {
                            width: 100,
                            total: totalLength
                        });
                        progressBar.tick(progressEvent.loaded);
                        if (progressEvent.progress === 1) {
                            console.log('File berhasil didownload dan disimpan di : ', filePath);
                        }
                    }
                });

                const writer = fs.createWriteStream(filePath);
                igResponse.data.pipe(writer);

                // Tunggu sampai file selesai ditulis
                await new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });
            }

        } else {
            console.log("Gagal mendapatkan link audio dari API");
        }
    } catch (e) {
        console.log("Terjadi kesalahan saat mengunduh data", e);
    }
}

// tiktok('https://www.tiktok.com/@inidnn_/video/7241533000175881477');
