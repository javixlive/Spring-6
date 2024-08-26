-- Users
CREATE TABLE [dbo].[User](
	[userId] [uniqueidentifier] NOT NULL,
	[userName] [varchar](max) NULL,
	[userEmail] [varchar](max) NOT NULL,
	[userPassword] [varchar](max) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

--Movies
CREATE TABLE [dbo].[Movie](
	[movieId] [uniqueidentifier] NOT NULL,
	[title] [varchar](max) NOT NULL,
	[overview] [varchar](max) NULL,
	[release_date] [varchar](max) NULL,
	[vote_average] [decimal](18, 2) NULL,
	[vote_count] [int] NULL,
	[poster_path] [varchar](max) NULL,
	[original_language] [varchar](max) NULL,
	[genreId] [int] NULL,
 CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED 
(
	[movieId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Movie]  WITH CHECK ADD  CONSTRAINT [FK_Movie_Genre] FOREIGN KEY([genreId])
REFERENCES [dbo].[Genre] ([genreId])
GO

ALTER TABLE [dbo].[Movie] CHECK CONSTRAINT [FK_Movie_Genre]
GO

--Genres
CREATE TABLE [dbo].[Genre](
	[genreId] [int] NOT NULL,
	[title] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Genre_1] PRIMARY KEY CLUSTERED 
(
	[genreId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

--Favorites
CREATE TABLE [dbo].[Favorites](
	[favoritesId] [uniqueidentifier] NOT NULL,
	[userId] [uniqueidentifier] NOT NULL,
	[movieId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Favorites] PRIMARY KEY CLUSTERED 
(
	[favoritesId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Favorites]  WITH CHECK ADD  CONSTRAINT [FK_Favorites_Movie] FOREIGN KEY([movieId])
REFERENCES [dbo].[Movie] ([movieId])
GO

ALTER TABLE [dbo].[Favorites] CHECK CONSTRAINT [FK_Favorites_Movie]
GO

ALTER TABLE [dbo].[Favorites]  WITH CHECK ADD  CONSTRAINT [FK_Favorites_User] FOREIGN KEY([userId])
REFERENCES [dbo].[User] ([userId])
GO

ALTER TABLE [dbo].[Favorites] CHECK CONSTRAINT [FK_Favorites_User]
GO
