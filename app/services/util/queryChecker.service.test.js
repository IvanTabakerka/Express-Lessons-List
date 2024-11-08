const config = require("../../config/config");
const { idsEnumeration, date, status, numericRange, paginator } = require("./queryChecker.service");

jest.mock("../../config/config", () => ({
    query: { maxItemsPerRequest: 500 }
}));

describe("idsEnumeration", () => {
    test("должен преобразовать строку в массив чисел", () => {
        expect(idsEnumeration("1,2,3,4")).toEqual([1, 2, 3, 4]);
    });

    test("должен вернуть false для пустой строки", () => {
        expect(idsEnumeration("")).toBe(false);
    });

    test("должен вернуть false для не установленного значения", () => {
        expect(idsEnumeration()).toBe(false);
    });

    test("должен отфильтровать некорректные ID", () => {
        expect(idsEnumeration("1,2,notanumber,4,0")).toEqual([1, 2, 4]);
    });

    test("должен корректно обрабатывать ряд запятых", () => {
        expect(idsEnumeration(",,,")).toEqual(false);
    });
});

describe("date", () => {
    test("должен вернуть объект с корректной датой", () => {
        expect(date("2023-01-01")).toEqual({ start: "2023-01-01", end: false });
    });

    test("должен вернуть объект с диапазоном дат", () => {
        expect(date("2023-01-01,2023-02-01")).toEqual({ start: "2023-01-01", end: "2023-02-01" });
    });

    test("должен выбросить ошибку для неверного формата даты", () => {
        expect(() => date("2023-13-01")).toThrow({ status: 400, message: "Не верно введена дата" });
    });

    test("должен выбросить ошибку для неверного диапазона дат", () => {
        expect(() => date("2023-01-01,2023-13-01")).toThrow({ status: 400, message: "Не верно введена дата" });
    });

    test("должен корректно обрабатывать не заданную дату", () => {
        expect(date()).toEqual({ start: false, end: false });
    });

});

describe("status", () => {
    test("должен вернуть allow: true и value: true для статуса '1'", () => {
        expect(status("1")).toEqual({ allow: true, value: true });
    });

    test("должен вернуть allow: true и value: false для статуса '0'", () => {
        expect(status("0")).toEqual({ allow: true, value: false });
    });

    test("должен выбросить ошибку для неверного значения статуса", () => {
        expect(() => status("2")).toThrow({ status: 400, message: "Для статуса разрешены только значения 0 и 1" });
    });

    test("должен вернуть allow: false, если статус не указан", () => {
        expect(status()).toEqual({ allow: false });
    });
});

describe("numericRange", () => {
    test("должен вернуть объект с началом и концом диапазона", () => {
        expect(numericRange("1,4")).toEqual({ start: 1, end: 4 });
    });

    test("должен вернуть объект на конкретное число", () => {
        expect(numericRange("0")).toEqual({ start: 0, end: false });
    });


    test("должен вернуть объект с началом и концом false, если диапазон не указан", () => {
        expect(numericRange("")).toEqual({ start: false, end: false });
    });

    test("должен выбросить ошибку для неверного диапазона чисел", () => {
        expect(() => numericRange("1,notanumber")).toThrow({ status: 400, message: "Не верно введен диапазон чисел" });
    });
});

describe("paginator", () => {
    test("должен вернуть объект с limit и offset для указанной страницы и количества", () => {
        expect(paginator(2, 10)).toEqual({ limit: 10, offset: 10 });
    });

    test("должен использовать значение по умолчанию limit: 5, если itemsPerPage не указано", () => {
        expect(paginator(2)).toEqual({ limit: 5, offset: 5 });
    });

    test("должен выбросить ошибку, если itemsPerPage меньше или равно нулю", () => {
        expect(() => paginator(1, '0')).toThrow({status: 400, message: 'Количество элементов на странице должно быть числом больше нуля'});
    });

    test("должен выбросить ошибку, если itemsPerPage превышает config.query.maxItemsPerRequest", () => {
        expect(() => paginator(1, 600)).toThrow({ status: 400, message: "За раз возможно запросить только 500" });
    });

    test("должен выбросить ошибку, если page меньше или равно нулю", () => {
        expect(() => paginator(0, 10)).toThrow({status: 400, message: 'Номер страницы должен быть числом больше нуля'});
    });
});


