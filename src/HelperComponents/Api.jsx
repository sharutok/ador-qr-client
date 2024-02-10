const url = import.meta.env.VITE_BACKEND_URL
const port = import.meta.env.VITE_BACKEND_PORT

const link = `${url}:${port}`
export const api = {

    utils: {
        submit_pdf: `${link}/utils/pdf/process/`,
        read_text_from_pdf: `${link}/utils/read/text/from/pdf`,
        download_original_pdf: `${link}/utils/download/original`,
        download_embedded_pdf: `${link}/utils/download/embedded`,
    },
    main: {
        all_data: `${link}/main/all`
    }
}





















