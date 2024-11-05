# Этап сборки React приложения
FROM node:18 AS react-build
WORKDIR /app/frontend/organizational-structure

# Копируем package.json и package-lock.json
COPY frontend/organizational-structure/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код React приложения
COPY frontend/organizational-structure/ ./

# Собираем приложение
RUN npm run build

# Этап сборки .NET приложения
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app/backend/OrganizationalStructure

# Копируем файлы проекта и восстанавливаем зависимости
COPY backend/OrganizationalStructure/*.csproj ./
RUN dotnet restore

# Копируем все остальные файлы и собираем приложение
COPY backend/OrganizationalStructure/ ./
RUN dotnet publish -c Release -o out

# Используем официальный образ ASP.NET для запуска приложения
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Копируем собранное .NET приложение
COPY --from=build /app/backend/OrganizationalStructure/out ./

# Копируем собранное React приложение
COPY --from=react-build /app/frontend/organizational-structure/build ./wwwroot

# Указываем порт, на котором будет слушать приложение
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# Запускаем приложение
ENTRYPOINT ["dotnet", "OrganizationalStructure.dll"]