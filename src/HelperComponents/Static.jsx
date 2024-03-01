export const abbr = (objectTitle, object) => {
    return (
        <abbr title={objectTitle}>{object}</abbr>
    )
}
// 1 - test_certificate
// 2 - test_report
// 3 - both

export const file_type = [
    { name: "Test Certificate", value: "test_certificate" },
    { name: "Test Report", value: "test_report" },
]