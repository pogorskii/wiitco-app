export type GamesList = {
  expected_release_day: number | null;
  id: number;
  image: Object;
  name: string;
  oirginal_release_date: number | null;
  platforms: string[];
};

export type GameRelease = {
  id: number;
  title: string;
  releaseDay: number;
  imageUrl: string;
  blurUrl: string;
  platforms: string[];
};

export type GameReleasesPerDay<releaseDay extends number> = Map<
  releaseDay,
  GameRelease[]
>;

export type GameReleaseRaw = {
  expected_release_day: null | number;
  id: number;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string;
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string;
    image_tags: string;
  };
  name: string;
  original_release_date: string;
  platforms: GamePlatformRaw[];
};

export type GamePlatformRaw = {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
  abbreviation: string;
};

// export type GameReleasesPerDay = {
//   [releaseDay: string]: GameRelease[];
// };

// export type GameReleasesPerDay = {
//   day: [
//     {
//       id: number,
//       title: string,
//       releaseDay: number,
//       imageUrl: string,
//       platforms: [string]
//     }
//   ]
// };

// // This file contains type definitions for your data.
// // It describes the shape of the data, and what data type each property should accept.
// // For simplicity of teaching, we're manually defining these types.
// // However, these types are generated automatically if you're using an ORM such as Prisma.
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   password: string;
// };

// export type Customer = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
// };

// export type Invoice = {
//   id: string;
//   customer_id: string;
//   amount: number;
//   date: string;
//   // In TypeScript, this is called a string union type.
//   // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
//   status: 'pending' | 'paid';
// };

// export type Revenue = {
//   month: string;
//   revenue: number;
// };

// export type LatestInvoice = {
//   id: string;
//   name: string;
//   image_url: string;
//   email: string;
//   amount: string;
// };

// // The database returns a number for amount, but we later format it to a string with the formatCurrency function
// export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
//   amount: number;
// };

// export type InvoicesTable = {
//   id: string;
//   customer_id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   date: string;
//   amount: number;
//   status: 'pending' | 'paid';
// };

// export type CustomersTable = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   total_invoices: number;
//   total_pending: number;
//   total_paid: number;
// };

// export type FormattedCustomersTable = {
//   id: string;
//   name: string;
//   email: string;
//   image_url: string;
//   total_invoices: number;
//   total_pending: string;
//   total_paid: string;
// };

// export type CustomerField = {
//   id: string;
//   name: string;
// };

// export type InvoiceForm = {
//   id: string;
//   customer_id: string;
//   amount: number;
//   status: 'pending' | 'paid';
// };
